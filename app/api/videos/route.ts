import {NextRequest,NextResponse} from 'next/server';
export async function GET(request:NextRequest){
 const key=process.env.YOUTUBE_API_KEY;
 if(!key)return NextResponse.json({error:'Configure YOUTUBE_API_KEY in .env.local'}, {status:503});
 const topic=(request.nextUrl.searchParams.get('topic')||'documentary').slice(0,100);
 const url=new URL('https://www.googleapis.com/youtube/v3/search');
 url.searchParams.set('part','snippet');url.searchParams.set('type','video');url.searchParams.set('videoEmbeddable','true');url.searchParams.set('maxResults','40');url.searchParams.set('q',topic);url.searchParams.set('key',key);
 const response=await fetch(url,{next:{revalidate:1800}});
 if(!response.ok)return NextResponse.json({error:'YouTube API request failed',details:await response.text()},{status:response.status});
 const data=await response.json();
 return NextResponse.json({videos:(data.items||[]).map((item:any)=>({id:item.id.videoId,title:item.snippet.title,channel:item.snippet.channelTitle,thumbnail:item.snippet.thumbnails?.medium?.url||'',publishedAt:item.snippet.publishedAt,description:item.snippet.description||''}))});
}
