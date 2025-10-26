export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { 
        Platform = 'Unknown',
        Error = '',
        Notes = '',
        Other = '',
        ...otherData
      } = req.body;

      const response = await fetch(`https://api.airtable.com/v0/app3fvC3WsJhNaSYg/Auth-errors`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer patMjwBLL75xtsCLm.101eaea4829b98a1362a00cf92d6bc715c7a5801a826178f79569425205a7008`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Platform': Platform,
                'Error-info': Error,
                'Notes': Notes,
                'Other': Other,
                'Timestamp': new Date().toISOString(),
                'FullData': JSON.stringify(otherData)
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
    res.status(405).json({ error: 'Method not allowed. Version: 5' });
  }
}