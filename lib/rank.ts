export type Video = {id:string;title:string;channel:string;thumbnail:string;publishedAt:string;description:string};
export type Feedback = Record<string,'like'|'dislike'|'hide'>;
export function scoreVideo(video:Video, interests:string[], feedback:Feedback):number {
  if(feedback[video.id]==='hide') return -10000;
  const text=(video.title+' '+video.description+' '+video.channel).toLowerCase();
  const relevance=interests.length?interests.reduce((sum,term)=>sum+(text.includes(term.toLowerCase())?1:0),0)/interests.length:0.3;
  const ageDays=Math.max(0,(Date.now()-new Date(video.publishedAt).getTime())/86400000);
  const freshness=Math.exp(-ageDays/120);
  const novelty=1/(1+Math.max(0,ageDays)/365);
  const explicit=feedback[video.id]==='like'?0.2:feedback[video.id]==='dislike'?-0.5:0;
  return 0.55*relevance+0.25*freshness+0.2*novelty+explicit;
}
export function rankVideos(videos:Video[], interests:string[], feedback:Feedback):Video[] {
  const sorted=[...videos].filter(v=>feedback[v.id]!=='hide').sort((a,b)=>scoreVideo(b,interests,feedback)-scoreVideo(a,interests,feedback));
  const selected:Video[]=[]; const channelCount:Record<string,number>={};
  for(const video of sorted){ if((channelCount[video.channel]||0)>=2)continue;selected.push(video);channelCount[video.channel]=(channelCount[video.channel]||0)+1; }
  return selected;
}
