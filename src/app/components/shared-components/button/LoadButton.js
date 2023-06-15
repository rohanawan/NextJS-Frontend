const LoadButton = ({handleClick, text}) =>{
    return <div className="flex justify-center mt-8">
        <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleClick}
        >
          {text}
        </button>
    </div>
}

export default LoadButton;