export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const response = await fetch(`https://api.airtable.com/v0/app3fvC3WsJhNaSYg/Submissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer patMjwBLL75xtsCLm.101eaea4829b98a1362a00cf92d6bc715c7a5801a826178f79569425205a7008`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Data': 'Data body =)',//JSON.stringify(req.body),
                'Timestamp': new Date().toISOString(),
                // Add specific fields if you want them as separate columns
                ...req.body
              }
            }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Airtable error: ${error}`);
      }

      const result = await response.json();
      
      res.status(200).json({ 
        success: true, 
        id: result.records[0].id 
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed 3' });
  }
}