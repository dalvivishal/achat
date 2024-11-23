import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Stack, Tab, Tabs } from '@mui/material';

function EventCard({ title, subtitle, assignedTo, onButtonClick, backgroundColor }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, backgroundColor, mb: 2 }}>
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="body2" color="textSecondary">{subtitle}</Typography>
        {assignedTo && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Assigned to <span style={{ fontWeight: 'bold' }}>{assignedTo}</span>
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onButtonClick}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default function TodaysHighlights() {
  const [selectedTab, setSelectedTab] = React.useState(1);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const events = [
    { title: 'Case# 992346', subtitle: 'Demand Letter: Jamie Morgan', assignedTo: 'Kenneth J. Hilliard', backgroundColor: '#e3f2fd' },
    { title: 'Case# 991324', subtitle: 'Medical Record Review: Chris Patton', assignedTo: 'Patrick S. Lombardi', backgroundColor: '#fff3e0' },
    { title: 'Memorial Day', subtitle: 'Neural IT Team may not be available today', backgroundColor: '#e8f5e9' },
  ];

  return (
    <Box sx={{ width: 300, mx: 'auto', my: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Today's Highlights</Typography>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Mon 23" />
        <Tab label="Tue 24" />
        <Tab label="Wed 25" />
        <Tab label="Thu 26" />
        <Tab label="Fri 27" />
      </Tabs>

      <Stack spacing={2}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            subtitle={event.subtitle}
            assignedTo={event.assignedTo}
            backgroundColor={event.backgroundColor}
            onButtonClick={() => alert(`Viewing ${event.title}`)}
          />
        ))}
      </Stack>
    </Box>
  );
}
