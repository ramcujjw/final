import React from 'react';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ items }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            PaperProps={{ style: { width: 240 } }}
        >
            <List>
                {items.map((item, index) => (
                    <ListItem button key={index} onClick={() => navigate(item.path)}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
