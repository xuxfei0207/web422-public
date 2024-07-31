export default function handler(req, res) {
    const { name } = req.body;
    const { method } = req;
  
    switch (method) {
      case 'POST':
        // Create data in your database
        res.status(200).json({ message: `TODO: Create User with Name: ${name}` });
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }