export const formatData = (imagesData) => imagesData.map((imageData) => {
        return {
            moving: imageData.images.fixed_width,
            still: imageData.images.fixed_width_still,
            key: imageData.id,
            title: imageData.title
        }
    });