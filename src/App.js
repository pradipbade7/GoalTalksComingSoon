import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import {
  SportsSoccer,
  EmojiEvents,
  Facebook,
  Mic,
  Instagram,
  KeyboardArrowUp,
} from '@mui/icons-material';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqthiubwdairvmuelebr.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdGhpdWJ3ZGFpcnZtdWVsZWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjMwODQsImV4cCI6MjA1MzI5OTA4NH0.cioF1EZXrmrw3hlUOod_rNCt2rgLcV0Bq8SNAeVZvQE'; 
const supabase = createClient(supabaseUrl, supabaseKey);


// Color palette
const themeColors = {
  primary: '#c30f06',
  secondary: '#61110f',
  background: '#00000054',
  backgroundSecondary: '#00000096',
  textPrimary: '#FFFFFF',
  textSecondary: '#FFFFFF',
  white: '#FFFFFF',
  lightGray: '#EEEEEE',
  backgroundDark: '#0000009e',
  success : '#4caf50',
};

const features = [
  {
    icon: <SportsSoccer />,
    title: 'Anything Football',
    description: 'From goals to gossip, we’ve got everything except Messi’s phone number.',
    color: themeColors.white,
  },
  {
    icon: <EmojiEvents />,
    title: 'Games and Quizzes',
    description: 'Prove you know more than your friends—or pretend you do!',
    color: themeColors.white,
  },
  {
    icon: <Mic />,
    title: 'Football Talks',
    description: 'Where debates about the GOAT rage on, and VAR decisions make everyone mad.',
    color: themeColors.white,
  },
  // {
  //     icon: <Bolt />,
  //     title: 'Daily Football',
  //     description: 'Kickstart your day with tips, tricks, and the occasional dive like a pro.',
  //     color: themeColors.white,
  // },
];


const ComingSoon = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll detection effect
  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(window.pageYOffset > 400);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error',
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Check if the email already exists in the WaitList
      const { data: existingEmail, error: checkError } = await supabase
        .from('WaitList')
        .select('Email')
        .eq('Email', email);
  
      if (checkError) {
        console.error('Error checking email:', checkError);
        setSnackbar({
          open: true,
          message: 'Failed to check email. Please try again.',
          severity: 'error',
        });
        return;
      }
  
      if (existingEmail.length > 0) {
        setSnackbar({
          open: true,
          message: 'This email is already on the waitlist.',
          severity: 'warning',
        });
        return;
      }
  
      // Proceed with inserting the email if it's not a duplicate
      const { error } = await supabase.from('WaitList').insert([{ Email: email }]);
  
      if (error) {
        console.error('Error saving email:', error);
        setSnackbar({
          open: true,
          message: 'Failed to save email. Please try again.',
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Thank you for joining our waitlist!',
          severity: 'success',
        });
        setEmail(''); // Reset email input after successful submission
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };
  
  
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: {
          xs: `url(${process.env.PUBLIC_URL}/assets/background/Football-fans-talking-mobile.jpeg)`, // Mobile
          sm: `url(${process.env.PUBLIC_URL}/assets/background/Football-fans-talking-tab.jpeg)`,   // Tablet
          md: `url(${process.env.PUBLIC_URL}/assets/background/Football-fans-talking-1.jpg)`, // Desktop and above
        },
        backgroundSize: {
          md: 'cover',    // Desktop and above: Cover the entire area
          sm: 'cover',
          xs: 'contain',
        },
        backgroundPosition: {
          xs: 'top',      // Mobile: Position the image at the top
          sm: 'top',      // Tablet: Position the image at the top
          md: 'center',   // Desktop and above: Center the image
        },
        backgroundRepeat: 'no-repeat',
        color: themeColors.textPrimary,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: themeColors.primary,
      }}
    >



      {/* Hero Section */}
      <Fade in timeout={1000}>
        <Container maxWidth="sm">
          <Box
            sx={{
              pt: {
                md: 12, // Default padding-top for extra-small screens and above
                sm: 12,
                xs: 0,  // Padding-top for small screens
              },
              mt: {
                md: 0, // Default padding-top for extra-small screens and above
                sm: 0,
                xs: 0,  // Padding-top for small screens
              },
              textAlign: 'center',
            }}
          >
            <Box
              component="img"
              alt="GoalTalks"
              src={`${process.env.PUBLIC_URL}/logo/logo-main-1.png`}
              sx={{ width: 0.5, objectFit: 'cover' }}
            />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: themeColors.primary,
                background: {
                  sm: themeColors.backgroundDark,
                  xs: themeColors.backgroundDark,
                  md: 'transparent'
                }
              }}
            >
              Coming Soon
            </Typography>
          </Box>
        </Container>
      </Fade>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: themeColors.background,
          minHeight: '20vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: {
            xs: '80%',
            sm: '100%',
          },
          py: {
            md: 6, // Default padding-top for extra-small screens and above
            sm: 0,
            xs: 0,  // Padding-top for small screens
          },
          mt: {
            md: 0, // Default padding-top for extra-small screens and above
            sm: 12,
            xs: 12,  // Padding-top for small screens
          },
        }}
      >
        <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} >
              <Card
                sx={{
                  textAlign: 'center',
                  py: 1.5,
                  position: 'relative',
                  background: 'transparent', // Make the card itself transparent
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  borderRadius: 0,
                  zIndex: 2,
                  color: themeColors.white,
                  minHeight: {
                    md: '12vh', // Default padding-top for extra-small screens and above
                    sm: '12vh',
                    xs: '10vh',  // Padding-top for small screens
                  },

                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${themeColors.primary} 30%, ${themeColors.secondary} 100%)`,
                    opacity: 0.7, // Apply opacity only to the background
                    zIndex: -1, // Place the pseudo-element behind the content
                    borderRadius: 'inherit', // Match the border radius of the card
                  },
                }}
              >

                <IconButton sx={{ color: feature.color, fontSize: 40 }}>
                  {feature.icon}
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ color: themeColors.textPrimary }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: themeColors.textSecondary, px: 1 }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* Newsletter Section */}
      <Fade in timeout={2000}>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              m: 2,
              background: themeColors.backgroundSecondary,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleEmailSubmit}>
              <Typography variant="h6" gutterBottom
                sx={{
                  color: themeColors.textPrimary,
                  mb: 2,
                  fontSize: {
                    xs: '1rem', // Smaller font size for small screens
                    sm: '1.3rem',   // Default font size for larger screens
                    md: '1.5rem'
                  }
                }}>
                Join and be the first ones to know when we go live!
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: themeColors.white, // Text color
                      '& fieldset': {
                        borderColor: themeColors.white, // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: themeColors.primary, // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: themeColors.primary, // Focused border color
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: themeColors.white, // Placeholder text color
                      opacity: 1, // Ensure full opacity for placeholder
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: themeColors.primary,
                    color: themeColors.white,
                    padding: {
                      xs: '4px 8px', // Small padding for small screens
                      sm: '8px 16px', // Default padding for small and larger screens
                    },
                    fontSize: {
                      xs: '0.8rem', // Smaller font size for small screens
                      sm: '1rem',   // Default font size for larger screens
                    },
                    width: {
                      xs: '50%', // Full width for small screens
                    },
                    margin: {
                      xs: 'auto', // Center the button for small screens
                    },
                    '&:hover': {
                      bgcolor: themeColors.primary,
                      color: themeColors.white,
                      '&:hover': {
                        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
                      },
                    },
                  }}
                  disabled={isSubmitting}
                >
                   {isSubmitting ? 'Submitting...' : 'Notify Me'}
                </Button>

              </Box>
            </form>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Typography variant="h5" sx={{ fontSize: 'large', color: themeColors.white, alignContent: 'center' }}>
                Follow us
              </Typography>
              {[
                { icon: <Facebook />, color: '#1877f2', link: 'https://www.facebook.com/GoalTalks/' },
                { icon: <Instagram />, color: '#e4405f', link: 'https://www.instagram.com/goaltalksofficial/' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: social.color,
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      backgroundColor: themeColors.secondary
                    },
                    transition: 'transform 0.3s ease',
                  }}

                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Paper>
        </Container>
      </Fade>

      {/* Scroll to Top Button */}
      {showScroll && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: themeColors.primary,
            color: themeColors.white,
            '&:hover': {
              bgcolor: themeColors.primary,
            },
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            width: '100%',
            backgroundColor: snackbar.severity === 'success' ? themeColors.success : '#d32f2f',
            color: themeColors.white,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComingSoon;
