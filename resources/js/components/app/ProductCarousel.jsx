import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
const ProductCarousel = ({ images }) => {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const goToSlide = (index) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    return (
        <>
            {/* Images */}
            <div className="gap-4 lg:grid lg:w-1/2 lg:grid-cols-[1fr_4fr]">
                {/* Thumbnails (Desktop left side) */}
                <div className="hidden flex-col gap-3 lg:flex">
                    {images.map((image, idx) => (
                        <img
                            key={idx}
                            src={image.thumb}
                            alt={`Thumbnail ${idx + 1}`}
                            className={`h-20 w-20 cursor-pointer rounded-lg border-2 object-cover transition-all hover:border-blue-300 ${
                                current === idx ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                            }`}
                            onClick={() => goToSlide(idx)}
                        />
                    ))}
                </div>

                {/* Main Carousel */}
                <div className="relative">
                    <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {images.map((image, key) => (
                                <CarouselItem key={key}>
                                    <Card className="bg-white dark:bg-black">
                                        <CardContent className="p-0">
                                            <img src={image.large} className="aspect-square w-full rounded object-cover" />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>

                {/* Mobile thumbnails below */}
                <div className="mt-3 flex space-x-2 overflow-x-auto pb-2 lg:hidden">
                    {images.map((image, idx) => (
                        <img
                            key={idx}
                            src={image.thumb}
                            alt={`Thumbnail ${idx + 1}`}
                            className={`h-16 w-16 cursor-pointer rounded border-2 object-cover transition-all hover:border-blue-300 ${
                                current === idx ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                            }`}
                            onClick={() => goToSlide(idx)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductCarousel;
