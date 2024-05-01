const { body, validationResult, check } = require('express-validator');
const validUrl = require('valid-url');


const whatsappTemplateValidation = [
  // Validate top-level properties
  // Validate the "name" field
  body('name').notEmpty().withMessage('The "name" field is required.'),
  
  // Validate the "language" field
  body('language').notEmpty().withMessage('The "language" field is required.'),
  
  // Validate the "category" field
  body('category')
    .notEmpty().withMessage('The "category" field is required.')
    .custom((value) => {
      // Check if the category value is one of the allowed values
      if (!(['MARKETING', 'UTILITY', 'AUTHENTICATION'].includes(value))) {
        throw new Error('Invalid category value.');
      }
      return true;
    }),
  
  // Validate the "components" field
  body('components').isArray().withMessage('The "components" field must be an array.'),
  
  // Loop through each component using a custom validator
  check('components.*').custom((value) => {
  
    // Validate the "type" field for each component
    if (!value.type) {
      throw new Error('Each component must have a "type" field.');
    }
  
    // Check if the component type is one of the allowed values
    if (!['HEADER', 'BODY', 'FOOTER', 'BUTTONS'].includes(value.type)) {
      throw new Error('Invalid component type.');
    }
  
    if (value.type === 'HEADER') {

      // Validate the "format" field for HEADER components
      if (!['IMAGE', 'TEXT', 'LOCATION', 'DOCUMENT', 'VIDEO'].includes(value.format)) {
        throw new Error('Invalid component format for HEADER.');
      }
    
      // Validate the "example" field for IMAGE and DOCUMENT formats (optional)
      if (['IMAGE', 'DOCUMENT'].includes(value.format) && value.example) {
        if (!Array.isArray(value.example.header_handle)) {
          throw new Error(`Invalid header_handle format for HEADER with ${value.format} format.`);
        }
      }
    
      // Additional validation for TEXT format
      if (value.format === 'TEXT') {
         // Check if the text property exists
          if (!value.text) {
           throw new Error('Text is required for HEADER component with TEXT format.');
          }

          // Check if the text length exceeds 60 characters
          if (value.text.length > 60) {
          throw new Error('Text in HEADER component with TEXT format cannot exceed 60 characters.');
          }

          let  placeholderCount = 0;
          if (typeof text === 'string') {
            placeholderCount = (text.match(/{{\d+}}/g) || []).length;
          }

          // Check if the example property exists
          if (placeholderCount > 0 && value.example && value.example.header_text && value.example.header_text.length === 0) {
           throw new Error('Example property with sample variable value cannot be empty for HEADER component with TEXT format containing placeholders.');
          }
      }

      

    }
    
  
    // Validate the "text" field for BODY components
    if (value.type === 'BODY') {
      const { text, example } = value;
  
      // Validate the "text" field for BODY components
      if (!text) {
          throw new Error('Text is required for BODY component.');
      }
  
      // Validate if the text contains placeholders
      const placeholderRegex = /\{\{\d+\}\}/g;
      const placeholders = text.match(placeholderRegex);
      if (!placeholders) {
          throw new Error('Text must contain at least one placeholder.');
      }
  

      // Check if the placeholders are in sequential order starting from 1
      const placeholderNumbers = placeholders.map((placeholder) => parseInt(placeholder.match(/\d+/)[0]));
      const expectedPlaceholderNumbers = Array.from({ length: placeholders.length }, (_, i) => i + 1);
  
      if (!placeholderNumbers.every((num, index) => num === expectedPlaceholderNumbers[index])) {
        throw new Error('Placeholders must be in sequential order starting from 1.');
      }
      
      // Validate if the number of placeholders matches the number of example values
      if (example && example.body_text && Array.isArray(example.body_text)) {

          const numberOfPlaceholders = placeholders.length;
          const numberOfExampleValues = example.body_text[0].length;

          if (numberOfPlaceholders !== numberOfExampleValues) {
              throw new Error('Number of placeholders does not match the number of example values.');
          }
  
          // Validate each example value
          example.body_text[0].forEach((value, index) => {
              if (typeof value !== 'string') {
                  throw new Error(`Invalid variable value in Body components.`);
              }
              if (value.trim() === '') {
                  throw new Error("Example value cannot be empty");
              }
          });
      }
  
      // Validate if the length of the text does not exceed 1024 characters
      if (text.length > 1024) {
          throw new Error('Text exceeds the maximum character limit of 1024.');
      }
  }
  
    // Validate the "button_text" field for BUTTONS components
        if (value.type === 'BUTTONS') {
        const { buttons } = value;

        //  console.log(buttons)
        // new code
        // Validate if buttons is an array
        if (!Array.isArray(buttons)) {
          throw new Error('Buttons must be an array.');
        }

        // Validate each button
        buttons.forEach((button, index) => {

        if (button.type === 'PHONE_NUMBER') {
        // Validate the "type" field
          if (button.type !== 'PHONE_NUMBER') {
            throw new Error(`Invalid type for button ${index + 1}.`);
          }

          // Validate the "text" field
          if (!button.text || typeof button.text !== 'string' || button.text.length > 25) {
            throw new Error(`Invalid or missing text for button ${index + 1}.`);
          }

          // Validate the "phone_number" field
          if (!button.phone_number || typeof button.phone_number !== 'string' || button.phone_number.length > 20) {
            throw new Error(`Invalid or missing phone number for button ${index + 1}.`);
          }

        }

        if (button.type === 'URL') {

        const { text, url, example } = button;

        // Validate the "text" field
          if (!text || typeof text !== 'string' || text.length > 25) {
           throw new Error('Invalid or missing text for URL button. Maximum 25 characters allowed.');
          }

        // Validate the "url" field
          if (!url || typeof url !== 'string' || url.length > 2000) {
           throw new Error('Invalid or missing URL for URL button. Maximum 2000 characters allowed.');
          }

        // Check if the URL contains a variable
        if (url.includes('{{1}}')) {
          // Validate the "example" field
            if (!example || !Array.isArray(example) || example.length !== 1 || typeof example[0] !== 'string' || example[0].length > 2000) {
            throw new Error('Invalid or missing example for URL button. Must be an array with a single string, maximum 2000 characters allowed.');
            }
          } else {
          // If URL doesn't contain a variable, example should not be provided
            if (example && example.length > 0) {
            throw new Error('Example should not be provided for URL button without a variable in the URL.');
            }
          }
        }

        if (button.type === 'QUICK_REPLY') {
            const { text } = button;

        // Validate the "text" field
          if (!text || typeof text !== 'string' || text.length > 25) {
              throw new Error('Invalid or missing text for Quick Reply button. Maximum 25 characters allowed.');
          }
        }


        if (button.type === 'COPY_CODE') {
        const { example } = button;

        // Validate the "example" field
          if (!example || typeof example !== 'string' || example.length > 15) {
          throw new Error('Invalid or missing example for Copy Code button. Maximum 15 characters allowed.');
          }
        }
        });
        // end new code
        }
  
    return true;
  }),
  ];

const validationResponse = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
          field: error.param,
          message: error.msg
        }));
    
        // Return the first error found 
        return res.status(200).json({
          STATUS: "ERROR",
          ERROR_FILTER: "VALIDATION_ERROR",
          ERROR_CODE: "SPXT-V",
          ERROR_DESCRIPTION: errorMessages[0].message, // Send only the first error
        });
      }

    // Data is valid, proceed to the next middleware or route handler
    next();
  };
  

module.exports = { whatsappTemplateValidation, validationResponse };