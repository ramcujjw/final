import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <ListItem button component={Link} to={item.path} key={index}>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </div>
    );
};

export default Sidebar;
