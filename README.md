# Invoice Studio - Quick Setup

## Open App
1. Open `invoice.html` in Chrome.
2. Enter your license key.

## Email Setup (Required)
Fill these in **Email send setup (EmailJS)**:
- Public Key
- Service ID
- Template ID

Links:
- Free signup: https://dashboard.emailjs.com/sign-up
- Public Key: https://dashboard.emailjs.com/admin/account
- Service ID: https://dashboard.emailjs.com/admin
- Template ID: https://dashboard.emailjs.com/admin/templates
- YouTube tutorial (EmailJS): https://www.youtube.com/results?search_query=emailjs+setup+tutorial

## Google Advanced Features
Google OAuth / Drive / Sheets integration is temporarily disabled in this clean build.

Current behavior:
- Normal EmailJS sending works.
- PDF and HTML invoice copy are still included in email flow (with fallback if template fields are strict).
- No Google OAuth popup is required.

## Use App
1. Add invoice details + task(s)
2. Click `Send Invoice`

Admin quick test:
- Click `Send Test Email`

For support, contact: manilacreatives.store@gmail.com

## Workflow Templates

### ALPHA-CODE: GLOBAL-IMAGE-INTAKE
Project: `<project name>`
Type: `<email|website|screenshot|general>`
Source: `<url or file path>`
