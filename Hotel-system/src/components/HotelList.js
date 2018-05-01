import React, { Component } from 'react';
import HotelCard from './HotelCard.js'

export default class HotelList extends Component {
    render() {
        return (
            <div>
                {this.props.hotels.map(h => (
                    <HotelCard
                        //delete step 4/7
                        canDelete={h.id === 2} // при друг сървър(тук сравнявам дали хотела е създаден от логнатия юзер, ако не не трябва да може да го изтрие)
                        del={() => this.props.deleteHotel(h.id)}

                        key={h.id}
                        id={h.id}
                        name={h.name}
                        location={h.location}
                        image={h.image}
                    />
                ))}
            </div>
        )
    }
}