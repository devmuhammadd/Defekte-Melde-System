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


def populate_data(db):
    for key in sample_data.keys():
        for name in sample_data[key]:
            print(f"Adding {name} to {key}!")
            if key == 'stations':
                record = Station(name=name)
            elif key == 'rooms':
                record = Room(name=name)
            elif key == 'vehicles':
                record = Vehicle(name=name)
            db.add(record)
    db.commit()


if __name__ == "__main__":
    db = next(get_db())
    populate_data(db)
    db.close()
