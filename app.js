const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'الرئيسية' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'من نحن' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'خدماتنا' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'اتصل بنا' });
});

app.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  // Simple validation
  if (!name || !email || !message) {
    return res.render('contact', { 
      title: 'اتصل بنا',
      error: 'يرجى ملء جميع الحقول المطلوبة',
      success: null 
    });
  }

  try {
    // Here you would typically send the email
    // For demo purposes, we'll just log it
    console.log('Contact form submission:', { name, email, phone, subject, message });
    
    res.render('contact', { 
      title: 'اتصل بنا',
      error: null,
      success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.render('contact', { 
      title: 'اتصل بنا',
      error: 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      success: null 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});