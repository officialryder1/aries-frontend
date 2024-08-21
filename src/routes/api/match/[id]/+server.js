
const api = "http://127.0.0.1:8000/api/match"
export async function GET({params}) {

    const response = await fetch(`${api}/${params.id}`)
    return new Response(response.body);
};