type SubHeadingProps = {
    title: String;
} 

export function SubHeading({title}: SubHeadingProps) {
    return (
        <div className="text-lg font-normal text-gray-500 lg:text-xl">
            {title}
        </div>
    )
}