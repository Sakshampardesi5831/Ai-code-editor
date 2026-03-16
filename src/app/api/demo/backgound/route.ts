import { inngest } from "@/inngest/client";
export async function POST(req: Request){
    const { prompt } = await req.json();
    await inngest.send({
    name: "demo/generate",
    data:{ prompt }
    })
  return Response.json({status:"started"});
}

