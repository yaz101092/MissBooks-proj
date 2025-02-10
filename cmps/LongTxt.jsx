const { useState } = React

function LongTxt(txt, length = 100) {

    const [isExpanded, setIsExpanded] = useState(false)
    const displayText = isExpanded ? txt : txt.slice(0, length) + (txt.length > length ? "..." : "");
    return (
        // <span>
        //     {!isExpanded ? `${book.description} + '...'`: `${book.description}`}
        //     {book.description < length ? "": <button onClick={!isExpanded}>read more </button>}
        // </span>  
       
        <span>
            {displayText}
            {txt.length > length && (
                <span
                    className=''
                    role="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? ' Show less' : ' Show more'}
                </span>
            )}
        </span>
        
    )        
        

         
        
            

        

}