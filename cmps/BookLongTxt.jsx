const { useState } = React

export function BookLongTxt({ txt, length = 100}) {

    const [isExpanded, setIsExpanded] = useState(false)
    const description = isExpanded ? txt : txt.slice(0, length) + (txt.length > length ? "..." : "");
    return (
        <section className="book-long-txt">
            <p className="txt">{description}</p>
            {txt.length > length && (
                
                <button className="toggle-btn" role="button" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? ' Show less' : ' Read More'}
                </button>
            
            )}
        </section>     
    );  
    
}