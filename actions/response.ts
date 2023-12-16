import useSWR from 'swr';
// const URL=process.env.URL
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  };
export const get_response = (url: string) =>{

    const { data, error } = useSWR(url, fetcher);
    if (error) return '<div>Failed to load</div>';
    if (!data) return '<div>Loading...</div>';
    return data
}