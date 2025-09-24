
const Input = ({icon: Icon, ...props}) => {
  return (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="size-5 text-white"/>
        </div>
        <input
        {...props}
        className="w-full pl-10 pr-4 py-3 bg-gray-900 bg-opacity-5 backdrop-blur-sm 
               rounded-lg border border-gray-400 border-opacity-10
               focus:border-[#EA6625] focus:ring-2 focus:ring-[#EA6625] focus:ring-opacity-20
               text-white placeholder-gray-300 transition-all duration-300
               hover:bg-opacity-10"
        />
    </div>
  )
}

export default Input
