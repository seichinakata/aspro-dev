import React from 'react';
import { useSelectionContainer } from '@air/react-drag-to-select';
import theme from '../src/theme';

const MouseSelection = ({ onSelectionChange, onSelectionStart }) => {
    const { DragSelection } = useSelectionContainer({
        // eventsElement: document.getElementById('elements-container'),
        onSelectionChange,
        onSelectionStart,
        onSelectionEnd: () => { },
        selectionProps: {
            style: {
                position: 'absolute',
                marginTop: '10%!important',
                marginLeft: '10%!important',
                // border: `2px dashed ${theme.palette.secondary.main}`,
                borderRadius: 4,
                backgroundColor: theme.palette.primary.main,
                opacity: 0.5,
            },
        },
    });

    return <DragSelection />;
};

export default React.memo(MouseSelection);
