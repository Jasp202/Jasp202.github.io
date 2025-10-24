exports.handler = async (event, context) => {
  // Example: just return a test message
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Serverless function works!" }),
  };
};