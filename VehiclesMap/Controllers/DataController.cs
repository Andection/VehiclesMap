﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VehiclesMap.Controllers
{
    public class DataController : Controller
    {
        public ActionResult RecentSongs()
        {
            return Content(@"[
            {
                'name':
                'Blues At Sunrise (Live)',
                'artist':
                'Stevie Ray Vaughan',
                'album':
                'Blues At Sunrise',
                'description':
                'Description for Stevie',
                'played_date':
                '1',
                'station':
                1
            }
        ,
            {
                'name':
                'Sunshine Of Your Love (Live)',
                'artist':
                'Cream',
                'album':
                'Cream: Gold',
                'description':
                'Description for Cream',
                'played_date':
                '2',
                'station':
                1
            }
        ,
            {
                'name':
                'Ziggy Stardust (Remastered)',
                'artist':
                'David Bowie',
                'album':
                'The Rise And Fall Of Ziggy Stardust (Remastered)',
                'description':
                'Description for David',
                'played_date':
                '3',
                'station':
                1
            }
        ,
            {
                'name':
                'Runnin\' Down A Dream',
                'artist':
                'Tom Petty',
                'album':
                'Full Moon Fever',
                'description':
                'Description for Tom',
                'played_date':
                '4',
                'station':
                1
            }
        ,
            {
                'name':
                'Born Under A Bad Sign',
                'artist':
                'Jimi Hendrix',
                'album':
                'Blues',
                'description':
                'Description for Jimi',
                'played_date':
                '5',
                'station':
                1
            }
        ,
            {
                'name':
                'Paint It Black',
                'artist':
                'The Rolling Stones',
                'album':
                'Singles Collection: The London Years',
                'description':
                'Description for the Stones',
                'played_date':
                '6',
                'station':
                1
            }
        ,
            {
                'name':
                'Jumping Jack Flash',
                'album':
                'Rolling Stones Rock And Roll Cirucus',
                'artist':
                'The Rolling Stones',
                'description':
                'Description for the Stones',
                'played_date':
                7,
                'station':
                2
            }
        ,
            {
                'name':
                'Mama Told Me (Not To Come)',
                'album':
                'The Best Of Three Dog Night',
                'artist':
                'Three Dog Night',
                'description':
                'Description for the Dogs',
                'played_date':
                8,
                'station':
                2
            }
        ,
            {
                'name':
                'Digital Love',
                'album':
                'Discovery',
                'artist':
                'Daft Punk',
                'description':
                'Description for Daft Punk',
                'played_date':
                9,
                'station':
                3
            }
        ,
            {
                'name':
                'Alone With You',
                'album':
                'Random Album Title',
                'artist':
                'Deadmau5',
                'description':
                'Description for Deadmau5',
                'played_date':
                10,
                'station':
                3
            }
        ,
            {
                'name':
                'Love Song For No One',
                'album':
                'Room For Squares',
                'artist':
                'John Mayer',
                'description':
                'Description for John',
                'played_date':
                11,
                'station':
                4
            }
        ,
            {
                'name':
                'Mindstate',
                'album':
                'Mind State',
                'artist':
                'Pete Philly & Perquisite',
                'description':
                'Description for Pete',
                'played_date':
                12,
                'station':
                5
            }
        ,
            {
                'name':
                'Thieves In The Night',
                'album':
                'Mos Def & Talib Kweli Are Black Star',
                'artist':
                'Black Star',
                'description':
                'Description for Black Star',
                'played_date':
                13,
                'station':
                6
            }
        ,
            {
                'name':
                'Kissed it',
                'artist':
                'Macy Gray',
                'album':
                'The Sellout',
                'description':
                'Description for Macy',
                'played_date':
                14,
                'station':
                7
            }
        ]
            ");
        }


        public ActionResult SearchResults()
        {
            return Content(@" [{'id': 1, 'name': 'Led Zeppelin'}, 
        {'id': 2, 'name': 'The Rolling Stones'}, 
        {'id': 3, 'name': 'Daft Punk'},
        {'id': 4, 'name': 'John Mayer'}, 
        {'id': 5, 'name': 'Pete Philly & Perquisite'}, 
        {'id': 6, 'name': 'Black Star'},
        {'id': 7, 'name': 'Macy Gray'}]");
        }

        public ActionResult Stations()
        {
            return Content(@"  [{'id': 1, 'played_date': 4, 'name': 'Led Zeppelin'}, 
        {'id': 2, 'played_date': 3, 'name': 'The Rolling Stones'}, 
        {'id': 3, 'played_date': 2, 'name': 'Daft Punk'}]");
        }
    }
}
