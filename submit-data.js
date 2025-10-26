export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Just log the data - you can view it in Vercel logs
    console.log('Received data:', req.body);
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Data received',
      receivedData: req.body
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
