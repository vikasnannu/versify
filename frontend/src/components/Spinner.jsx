import React from 'react';
import { Spinner, Box } from '@chakra-ui/react';

function ElegantSpinner() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100px" // Smaller container for a more subtle appearance
      minW="100px"
      bg="white" // Simple, clean background color
      borderRadius="lg" // Gentle rounded corners for a soft, modern look
      boxShadow="sm" // A slight shadow for depth, without being too prominent
      p={4} // Padding to ensure the spinner doesn't touch the edges
    >
      <Spinner
        thickness="3px" // Slightly thinner for a more refined look
        speed="0.8s" // Smooth, steady rotation
        color="blue.500" // A soothing, elegant color
        size="md" // Moderate size for balance between visibility and subtlety
      />
    </Box>
  );
}

export default ElegantSpinner;
