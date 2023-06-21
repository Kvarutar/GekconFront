import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

const FeedSettings = ({isSettings, setSettings}) => {
    const [checked, setChecked] = useState({
        'news': {"games": true, "comics": true},
        'events': {"1": true, "2": true},
        'discussion': {"1": true, "2": true}
    });

    const handleChange2 = (themeName, key, event) => {
        let tmp = {...checked};
        let newValues = {...tmp[themeName]};

        newValues = {
            ...newValues,
            [key]: event.target.checked
        }

        tmp = {
            ...tmp,
            [themeName]: newValues
        }

        setChecked(tmp)
    };

    const childrensChildren = (childrens, themeName) => {
        let menusItems = [];

        for (let [key, value] of Object.entries(childrens)) {
            menusItems.push(<Checkbox key={uuidv4()} checked={value} onChange={(e) => handleChange2(themeName, key, e)} label={key} />);
        }

        return (
            <Box key={uuidv4()} sx={{ display: 'flex', flexDirection: 'column', ml: 3, gap: 1, mt: 1 }}>
                {menusItems}
            </Box>
        )
    } 

    const children = () => {
        let menusParents = [];

        for (let [key, value] of Object.entries(checked)) {
            menusParents.push(<div>
                <Checkbox
                    label={key}
                    checked={Object.values(checked[key]).includes(true)}
                    indeterminate={checked[0] !== checked[1]}
                    key={uuidv4()}
                />
                {childrensChildren(value, key)}
            </div>);
        }

        return menusParents;
    }

    return(
        <Modal 
            open={isSettings} 
            onClose={() => setSettings(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Sheet variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}>
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                {children()}
                <button className="btn">Сохранить</button>
            </Sheet>
        </Modal>
    )
}

export default FeedSettings;