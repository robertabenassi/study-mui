import * as React from 'react';
import { styled } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PageEditor from './PageEditor';
import DomProvider, { useAppState } from '../AppState';
import AppEditorShell from './AppEditorShell';
import NoPageFound from './NoPageFound';
import { getPathnameFromView } from '../../utils/domView';

const classes = {
  content: 'Toolpad_Content',
  hierarchyPanel: 'Toolpad_HierarchyPanel',
  editorPanel: 'Toolpad_EditorPanel',
};

const EditorRoot = styled('div')(({ theme }) => ({
  height: 1,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  [`& .${classes.content}`]: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  [`& .${classes.hierarchyPanel}`]: {
    width: 250,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  [`& .${classes.editorPanel}`]: {
    flex: 1,
    overflow: 'hidden',
  },
}));

function FileEditor() {
  const { currentView } = useAppState();

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const newPathname = getPathnameFromView(currentView);
    if (newPathname !== location.pathname) {
      navigate({ pathname: newPathname }, { replace: true });
    }
  }, [currentView, location.pathname, navigate]);

  const currentViewContent = React.useMemo(() => {
    switch (currentView.kind) {
      case 'page':
        return <PageEditor nodeId={currentView.nodeId} />;
      default:
        return <NoPageFound />;
    }
  }, [currentView.kind, currentView.nodeId]);

  return <AppEditorShell>{currentViewContent}</AppEditorShell>;
}

export default function Editor() {
  return (
    <DomProvider>
      <EditorRoot>
        <FileEditor />
      </EditorRoot>
    </DomProvider>
  );
}
