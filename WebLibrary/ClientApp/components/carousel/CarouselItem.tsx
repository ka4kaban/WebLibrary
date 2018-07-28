import * as React from 'react';

export class CarouselItem extends React.Component<{
    imageSrc: string
}, {}> {
    public render() {
        return <div className="carouselItem">
            <img src={this.props.imageSrc} alt="bookPicture" width={105} height={165} />
        </div>;
    }
}
