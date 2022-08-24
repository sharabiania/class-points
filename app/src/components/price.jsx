import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
export default function Price() {
  return (
    <Card sx={{ maxWidth: 345, height: 380 }}>
    <CardMedia
      component="img"
      height="180"
      image="/price-logo.png"
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      🏆 Starbucks Giftcard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Top 3 students in the leaderboard will be awarded Starbucks giftcards.
      </Typography>
    </CardContent>
    <CardActions>      
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  );
}