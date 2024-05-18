type picsDataType = {
    id : number,
    title : string,
    src : string
}

export const picsData:picsDataType[] = [
    {
        id:1,
        title: "DressCode",
        src: "https://images.unsplash.com/photo-1682685795557-976f03aca7b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
    },
    {
        id:2,
        title: "DressCode",
        src: "https://images.unsplash.com/photo-1704326163357-cf0a659c226c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id:3,
        title: "DressCode",
        src: "https://images.unsplash.com/photo-1683009427666-340595e57e43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
    },
    {
        id:4,
        title: "DressCode",
        src: "https://images.unsplash.com/photo-1704326163357-cf0a659c226c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
    },
]

export const carouselData = {
    interval: 5000,
    picsData
}

