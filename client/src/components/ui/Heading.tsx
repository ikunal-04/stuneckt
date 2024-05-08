type HeadingProps = {
    title: String;
}

export function Heading({title}: HeadingProps){
    return (
        <div className="text-4xl font-bold py-2">
            {title}
        </div>
    )
}