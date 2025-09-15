// PaymentForm.tsx
// A simple form to initiate an STK push payment request.
// This component collects tenant ID, phone number, and amount, then sends a request to the backend.
// It displays the status of the request (sending, success, error).    
// Note: In a real application, ensure to handle sensitive data securely and validate inputs properly
// before sending requests.
// This is a simplified example for demonstration purposes only.

/*To run locally: start the backend at port 5000; 
run the frontend with Vite. Configure a proxy in vite.config to 
forward /api to http://localhost:5000 or run the client on a 
subdomain and set CORS on the server.*/

import React, { useState } from "react";
import axios from "axios";

export default function PaymentForm(){
  const [phone, setPhone] = useState("2547XXXXXXXX");
  const [amount, setAmount] = useState(1000);
  const [tenantId, setTenantId] = useState("tenant-1");
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent){
    e.preventDefault();
    setStatus("sending");
    try {
      const resp = await axios.post("/api/payments/stk-push", { tenantId, phone, amount });
      setStatus(`ok: ${JSON.stringify(resp.data).slice(0,200)}`);
    } catch (err:any) {
      setStatus(`err: ${err?.response?.data?.error || err.message}`);
    }
  }

  return (
    <div>
      <h2 className="text-lg mb-2">Initiate STK Push</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="block p-2 border" value={tenantId} onChange={e=>setTenantId(e.target.value)} />
        <input className="block p-2 border" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input type="number" className="block p-2 border" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Send STK</button>
      </form>
      <div className="mt-3 text-sm">{status}</div>
    </div>
  );
}
