import { z } from 'zod';

export const API_VERSION = 'v1';

function toolpadObjectSchema<K extends string, T extends z.ZodType>(kind: K, spec: T) {
  return z.object({
    apiVersion: z
      .literal(API_VERSION)
      .describe(
        `Defines the version of this object. Used in determining compatibility between Toolpad "${kind}" objects.`,
      ),
    kind: z.literal(kind).describe(`Describes the nature of this Toolpad "${kind}" object.`),
    spec: spec.describe(`Defines the shape of this "${kind}" object`),
  });
}

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
export const jsonSchema: z.ZodType<Json> = z
  .lazy(() => z.union([...literalSchema.options, z.array(jsonSchema), z.record(jsonSchema)]))
  .describe('A JSON compatible value, anything that is serializable to JSON.');

function nameValuePairSchema<V extends z.ZodTypeAny>(valueType: V) {
  return z
    .object({
      name: z.string().describe('The name'),
      value: valueType.describe(valueType.description ?? 'The value'),
    })
    .describe('A name/value pair.');
}

export const jsExpressionBindingSchema = z
  .object({
    $$jsExpression: z.string().describe('The expression to be evaluated.'),
  })
  .describe('A binding that evaluates an expression and returns the result.');

export const envBindingSchema = z
  .object({
    $$env: z.string().describe('The name of an environment variable.'),
  })
  .describe('An environment variable.');

function bindableSchema<V extends z.ZodTypeAny>(valueType: V) {
  return z.union([valueType, jsExpressionBindingSchema, envBindingSchema]);
}

const jsExpressionActionSchema = z
  .object({
    $$jsExpressionAction: z.string().describe('The code to be executed.'),
  })
  .describe('A javascript expression to be executed when this action is triggered.');

const navigationActionSchema = z
  .object({
    $$navigationAction: z.object({
      page: z.string().describe('The page that is being navigated to'),
      parameters: z
        .record(bindableSchema(z.any()))
        .describe('Parameters to pass when navigating to this page'),
    }),
  })
  .describe(
    'A navigation from one page to another, optionally passing parameters to the next page.',
  );

export type NavigationAction = z.infer<typeof navigationActionSchema>;

const fetchModeSchema = z.union([
  z.literal('query').describe('Fetch automatically when the page opens'),
  z.literal('mutation').describe('Fetch on manual action only'),
]);

const nameStringValuePairSchema = nameValuePairSchema(z.string()).describe(
  'a name/value pair with a string value.',
);

const rawBodySchema = z.object({
  kind: z.literal('raw'),
  content: bindableSchema(z.string()),
  contentType: z.string(),
});

const bindableNameStringValueSchema = nameValuePairSchema(bindableSchema(z.string())).describe(
  'A name/value pair where the value is dynamically bindable to strings.',
);

const urlEncodedBodySchema = z.object({
  kind: z.literal('urlEncoded'),
  content: z.array(bindableNameStringValueSchema),
});

const fetchBodySchema = z.discriminatedUnion('kind', [rawBodySchema, urlEncodedBodySchema]);

export type FetchBody = z.infer<typeof fetchBodySchema>;

const rawResponseTypeSchema = z
  .object({
    kind: z.literal('raw'),
  })
  .describe("Don't interpret this body at all.");

const jsonResponseTypeSchema = z
  .object({
    kind: z.literal('json'),
  })
  .describe('Interpret the fetch response as JSON');

const csvResponseTypeSchema = z
  .object({
    kind: z.literal('csv'),
    headers: z.boolean().describe('First row contains headers'),
  })
  .describe('Interpret the fetch response as CSV');

const xmlResponseTypeSchema = z
  .object({
    kind: z.literal('xml'),
  })
  .describe('Interpret the fetch response as XML');

const responseTypeSchema = z
  .discriminatedUnion('kind', [
    rawResponseTypeSchema,
    jsonResponseTypeSchema,
    csvResponseTypeSchema,
    xmlResponseTypeSchema,
  ])
  .describe('Describes how a the fetch response is to be interpreted.');

export type ResponseType = z.infer<typeof responseTypeSchema>;

const fetchQueryConfigSchema = z.object({
  kind: z.literal('rest').describe('Designates this object as a fetch query.'),
  url: bindableSchema(z.string()).optional().describe('The URL of the request'),
  method: z.string().optional().describe('The request method.'),
  headers: z.array(bindableNameStringValueSchema).optional().describe('Extra request headers.'),
  searchParams: z
    .array(bindableNameStringValueSchema)
    .optional()
    .describe('Extra url query parameters.'),
  body: fetchBodySchema.optional().describe('The request body.'),
  transformEnabled: z.boolean().optional().describe('Run a custom transformer on the response.'),
  transform: z.string().optional().describe('The custom transformer to run when enabled.'),
  response: responseTypeSchema.optional().describe('How to parse the response.'),
});

export type FetchQueryConfig = z.infer<typeof fetchQueryConfigSchema>;

const localQueryConfigSchema = z.object({
  kind: z.literal('local').describe('Designates this object as a local function query.'),
  function: z
    .string()
    .optional()
    .describe('The function to be executed on the backend by this query.'),
});

export type LocalQueryConfig = z.infer<typeof localQueryConfigSchema>;

const queryConfigSchema = z.discriminatedUnion('kind', [
  fetchQueryConfigSchema,
  localQueryConfigSchema,
]);

export type QueryConfig = z.infer<typeof queryConfigSchema>;

const querySchema = z.object({
  name: z.string().describe('A name for the query'),
  enabled: bindableSchema(z.boolean())
    .optional()
    .describe(
      "Activates or deactivates the query. When deactivated the data won't be loaded when the page opens.",
    ),
  parameters: z
    .array(nameValuePairSchema(bindableSchema(z.any())))
    .optional()
    .describe('Parameters to pass to this query.'),
  mode: fetchModeSchema.optional().describe('How to fetch this query.'),
  query: queryConfigSchema.optional().describe('Query definition'),
  transform: z.string().optional().describe('Transformation to run on the response'),
  transformEnabled: z.boolean().optional().describe('Enable the transformation'),
  refetchInterval: z.number().optional().describe('Interval to rerun this query at'),
  cacheTime: z.number().optional().describe('Time to cache before refetching'),
});

export type Query = z.infer<typeof querySchema>;

export type Template = {
  $$template: ElementType[];
};

let elementSchema: z.ZodType<ElementType>;

const templateSchema: z.ZodType<Template> = z
  .object({
    $$template: z
      .lazy(() => z.array(elementSchema))
      .describe('The subtree, that describes the UI to be rendered by the template.'),
  })
  .describe('Describes a fragment of Toolpad elements, to be used as a template.');

const baseElementSchema = z.object({
  component: z.string().describe('The component that this element was based on.'),
  name: z
    .string()
    .describe('a name for this component, which is used to reference it inside bindings.'),
  layout: z
    .object({
      horizontalAlign: z
        .string()
        .optional()
        .describe('Lays out the element along the horizontal axis.'),
      verticalAlign: z
        .string()
        .optional()
        .describe('Lays out the element along the vertical axis.'),
      columnSize: z
        .number()
        .optional()
        .describe('The width this element takes up, expressed in terms of columns on the page.'),
    })
    .optional()
    .describe('Layout properties for this element.'),
});

type BaseElement = z.infer<typeof baseElementSchema>;

export const bindablePropSchema = z.union([
  jsonSchema,
  jsExpressionBindingSchema,
  envBindingSchema,
  jsExpressionActionSchema,
  navigationActionSchema,
  templateSchema,
]);

export type BindableProp = z.infer<typeof bindablePropSchema>;

export type ElementType = BaseElement & {
  children?: ElementType[];
  props?: Record<string, BindableProp>;
};

elementSchema = baseElementSchema
  .extend({
    children: z
      .lazy(() => z.array(elementSchema).optional())
      .describe('The children of this element.'),
    props: z
      .lazy(() => z.record(bindablePropSchema).optional())
      .describe('The properties to configure this instance of the component.'),
  })
  .describe('The instance of a component. Used to build user interfaces in pages.');

export const pageSchema = toolpadObjectSchema(
  'page',
  z.object({
    id: z.string().describe('Serves as a canonical id of the page.'),
    title: z.string().optional().describe('Title for this page.'),
    parameters: z
      .array(nameStringValuePairSchema)
      .optional()
      .describe('Parameters for the page. These can be set inside of the url query string.'),
    queries: z
      .array(querySchema)
      .optional()
      .describe('Queries that are used by the page. These will load data when the page opens.'),
    content: z
      .array(elementSchema)
      .optional()
      .describe('The content of the page. This defines the UI.'),
    display: z
      .union([
        z
          .literal('standalone')
          .describe('Hide the Toolpad chrome and just display the content of the page'),
        z.literal('shell').describe('Show Toolpad header and navigation.'),
      ])
      .optional()
      .describe(
        'Display mode of the page. This can also be set at runtime with the toolpad-display query parameter',
      ),
  }),
);

export type Page = z.infer<typeof pageSchema>;

export const themeSchema = toolpadObjectSchema(
  'theme',
  z.object({
    'palette.mode': z
      .union([z.literal('light'), z.literal('dark')])
      .optional()
      .describe('The MUI theme palette mode.'),
    'palette.primary.main': z.string().optional().describe('The primary theme color.'),
    'palette.secondary.main': z.string().optional().describe('The secondary theme color.'),
  }),
);

export type Theme = z.infer<typeof themeSchema>;

export const META = {
  schemas: {
    Page: pageSchema,
    Theme: themeSchema,
  },
  definitions: {
    Json: jsonSchema,
    JsExpressionBinding: jsExpressionBindingSchema,
    EnvBinding: envBindingSchema,
    JsExpressionAction: jsExpressionActionSchema,
    NavigationAction: navigationActionSchema,
    BindableProp: bindablePropSchema,
    Element: elementSchema,
    Template: templateSchema,
    NameStringValuePair: nameStringValuePairSchema,
    BindableNameStringValue: bindableNameStringValueSchema,
  },
};
