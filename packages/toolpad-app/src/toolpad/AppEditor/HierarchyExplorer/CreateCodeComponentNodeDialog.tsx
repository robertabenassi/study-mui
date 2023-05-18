import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Portal,
  Snackbar,
  TextField,
} from '@mui/material';
import * as React from 'react';
import invariant from 'invariant';
import CloseIcon from '@mui/icons-material/Close';
import * as appDom from '../../../appDom';
import { useDom } from '../../AppState';
import DialogForm from '../../../components/DialogForm';
import useEvent from '../../../utils/useEvent';
import { useNodeNameValidation } from './validation';
import client from '../../../api';
import useLatest from '../../../utils/useLatest';

const DEFAULT_NAME = 'MyComponent';

export interface CreateCodeComponentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCodeComponentDialog({
  open,
  onClose,
  ...props
}: CreateCodeComponentDialogProps) {
  const { dom } = useDom();

  const existingNames = React.useMemo(
    () => appDom.getExistingNamesForChildren(dom, appDom.getApp(dom), 'codeComponents'),
    [dom],
  );

  const [name, setName] = React.useState(appDom.proposeName(DEFAULT_NAME, existingNames));

  // Reset form
  const handleReset = useEvent(() => setName(appDom.proposeName(DEFAULT_NAME, existingNames)));

  React.useEffect(() => {
    if (open) {
      handleReset();
    }
  }, [open, handleReset]);

  const handleInputFocus = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  }, []);

  const inputErrorMsg = useNodeNameValidation(name, existingNames, 'component');
  const isNameValid = !inputErrorMsg;
  const isFormValid = isNameValid;

  const [snackbarState, setSnackbarState] = React.useState<{ name: string } | null>(null);
  const lastSnackbarState = useLatest(snackbarState);
  const handleSnackbarClose = React.useCallback(() => {
    setSnackbarState(null);
  }, []);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} {...props}>
        <DialogForm
          autoComplete="off"
          onSubmit={async (event) => {
            event.preventDefault();
            invariant(isFormValid, 'Invalid form should not be submitted when submit is disabled');
            await client.mutation.createComponent(name);
            onClose();
            setSnackbarState({ name });
          }}
        >
          <DialogTitle>Create a new Code Component</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ my: 1 }}
              required
              onFocus={handleInputFocus}
              autoFocus
              fullWidth
              label="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={open && !isNameValid}
              helperText={inputErrorMsg}
            />
          </DialogContent>
          <DialogActions>
            <Button color="inherit" variant="text" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Create
            </Button>
          </DialogActions>
        </DialogForm>
      </Dialog>
      {lastSnackbarState ? (
        <Portal>
          <Snackbar
            open={!!snackbarState}
            onClose={handleSnackbarClose}
            message={`Component "${lastSnackbarState.name}" created`}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            action={
              <React.Fragment>
                <Button
                  size="small"
                  onClick={() => {
                    client.mutation.openCodeComponentEditor(name).catch((err) => {
                      // TODO: Write docs with instructions on how to install editor
                      // Add a good looking alert box and inline some instructions and link to docs
                      // eslint-disable-next-line no-alert
                      alert(err.message);
                    });
                  }}
                >
                  Open
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleSnackbarClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </Portal>
      ) : null}
    </React.Fragment>
  );
}
