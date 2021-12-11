import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const OptionsPanel = function ({
  setDice, setBackground, backgrounds,
}) {
  const handleDiceChange = (e) => {
    setDice(e.target.value);
  };

  const handleBackgroundChange = (e) => {
    setBackground(e.target.name);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <h1>Dice Creator</h1>
        <Divider />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Dice</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup
                name="radio-buttons-group"
                onChange={handleDiceChange}
                defaultValue="D4"
              >
                <FormControlLabel value="D4" control={<Radio />} label="D4" />
                <FormControlLabel value="D6" control={<Radio />} label="D6" />
                <FormControlLabel value="D8" control={<Radio />} label="D8" />
                <FormControlLabel value="D10" control={<Radio />} label="D10" />
                <FormControlLabel value="D12" control={<Radio />} label="D12" />
                <FormControlLabel value="D20" control={<Radio />} label="D20" />
                <FormControlLabel value="D100" control={<Radio />} label="D100" />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Background</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {backgrounds.map((item) => (
              <Card sx={{ maxWidth: 345 }} onClick={handleBackgroundChange}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="70"
                    image={item.thumb}
                    alt={item.title}
                    key={item.img}
                    name={item.img}
                  />
                </CardActionArea>
              </Card>

            ))}

          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Floor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">Coming soon</Typography>
          </AccordionDetails>
        </Accordion>
      </Drawer>

    </Box>
  );
};

OptionsPanel.propTypes = {
  setDice: PropTypes.func.isRequired,
  setBackground: PropTypes.func.isRequired,
  backgrounds: PropTypes.ArrayOf(PropTypes.shape({
    img: PropTypes.String,
    title: PropTypes.String,
    thumb: PropTypes.String,
  })).isRequired,
};

export default OptionsPanel;
