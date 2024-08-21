export async function load({ fetch, params }) {

    // Fetch the match data from the API
    const res = await fetch(`/api/match/${params.id}`);
    
    // Check if the response is successful
    if (!res.ok) {
        console.error("Error fetching match data");
        return {
            match: null,
            error: "Failed to load match data"
        };
    }

    // Parse the JSON data from the response
    const match = await res.json();

    return {
        match
    };
}
