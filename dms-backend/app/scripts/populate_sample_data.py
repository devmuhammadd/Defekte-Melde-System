import random
from app.db.session import get_db
from app.db.models.room import Room
from app.db.models.station import Station
from app.db.models.vehicle import Vehicle

sample_data = {
    'stations': [
        'FWGH Ludwigslust', 'FWGH Hornkaten', 'FWGH Glaisin', 'FWGH Techentin', 'FWGH Kummer'
    ],
    'rooms': [
        'Left Room', 'Right Room', 'Top Room', 'Bottom Room'
    ],
    'vehicles': [
        'ELW1', 'TLF 16/25', 'LF20/16', 'DLK', 'RW2', 'StfLF', 'TLF 16/24',
        'MTW', 'TSF', 'TSF-W', 'ELW1 K', 'ELW2 K'
    ]
}


def create_sample_stations(db):
    for name in sample_data['stations']:
        record = Station(name=name)
        db.add(record)
        print(f"Added {name} to stations!")
    db.commit()


def create_sample_vehicles_and_rooms(db):
    station_ids = [station.id for station in db.query(Station).all()]
    for key in sample_data.keys():
        for name in sample_data[key]:
            if key == 'rooms':
                station_id = random.choice(station_ids)
                record = Room(name=name, station_id=station_id)
            elif key == 'vehicles':
                station_id = random.choice(station_ids)
                record = Vehicle(name=name, station_id=station_id)
            else:
                continue
            print(f"Adding {name} to {key}!")
            db.add(record)
    db.commit()


if __name__ == "__main__":
    db = next(get_db())
    create_sample_stations(db)
    create_sample_vehicles_and_rooms(db)
    db.close()
