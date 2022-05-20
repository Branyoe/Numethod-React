import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardInfoModal from '../cardInfoModal';
import { Link } from 'react-router-dom';

export default function MyCard({imgSrc="", title="", description="", body = "", route = ""}) {

  const props = {
    imgSrc,
    title,
    body: `${description} ${body}` 
  }

  return (
    <Card sx={{ maxWidth: 300, textAlign: 'left' }}>
      <CardMedia
        component="img"
        height="140"
        image={imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
        size="small"
        component={Link}
        to={route}
        variant="contained"
        sx={{marginRight:1}}
        >
          Ir  
        </Button>
        <CardInfoModal {...props} />
      </CardActions>
    </Card>
  );
}
