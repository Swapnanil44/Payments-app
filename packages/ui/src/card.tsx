export function Card({title,children}:{
  title: string;
  children: React.ReactNode
}){
  return <div className="border p-6  rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-b p-b2">
        {title}
      </h1>
      {children}
  </div>
}