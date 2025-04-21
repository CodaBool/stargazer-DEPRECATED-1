# TODO
- see what github actions I could use for automatic postgres actions
  - can perform `pg_dump -h host -U user -t 'public."Location"' -t 'public."Comment"' --column-inserts --data-only --no-owner --no-privileges postgres | grep '^INSERT' > backup.sql` to dump public data
- mobile cant handle resize events for its menubar
- separate out existing and non-existing locations

# Linksz
- map editors 1 https://www.reddit.com/r/mapmaking/wiki/index/#wiki_1.0_links
- map editors 2 https://www.mapforge-software.com/links-to-map-making-apps/
- map editors 3 https://docs.google.com/document/d/1C7smRafom0Lgonicl1tgkQam5_zeUtkQ6fCodm0jGEg/edit
- react package for maps https://www.react-simple-maps.io/docs/geographies
- nextjs https://nextjs.org/docs/getting-started/installation
- shadcn https://ui.shadcn.com/docs/components/tooltip
- geo to topo convert https://jeffpaine.github.io/geojson-topojson/
- json minify https://codebeautify.org/jsonminifier
- icons https://lucide.dev/icons
- tailwind cheatsheet https://nerdcave.com/tailwind-cheat-sheet

# Process
1. https://www.figma.com -> svg
2. https://atticus.dev/svg-plotter/demo/index.html -> geojson (22000000 width)
3. https://mapshaper.org -> export individual layer to clipboard and paste topojson to data.js
4. https://geojson.io -> do your geo work here, export topojson to mapshaper

# top scifi VTT
1. Starfinder
2. Cyberpunk
3. Star Wars
4. Lancer
5. Alien

# maps
- Karma Reef Sector http://madletter.net/rpg/lancer/lancer-map-2.jpg
- Shasta http://madletter.net/rpg/lancer/shasta_bright.jpg
- life accurate map https://www.reddit.com/r/LancerRPG/comments/16r61x4/galactic_map_of_union_by_me
- canon info https://www.worldanvil.com/w/the-third-committee3A-lancer-billytherex/a/union-territory-location

## details
- Cradle blink gate position https://www.reddit.com/r/LancerRPG/comments/je5nzl/comment/gcjzcbb
- cmdk https://github.com/pacocoursey/cmdk

# laptop dev
- https://www.prisma.io/docs/orm/prisma-schema/overview
- example small https://www.prisma.io/nextjs
- guide https://vercel.com/guides/nextjs-prisma-postgres
- next-auth requirements https://authjs.dev/getting-started/adapters/prisma#schema
- example full https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/prisma/schema.prisma
- d3 starmap example https://observablehq.com/@d3/star-map?collection=@d3/d3-geo

# prisma commands
- bunx prisma db pull
- bunx prisma generate
- bunx prisma migrate dev
- bunx prisma db pull && bunx prisma generate
- bunx prisma migrate dev --name mew_migration_name && bunx prisma generate

# Notepad dump, proceed at your own risk
## Part 1
#### worth adding
argo navis
havelburg
cressidium

#### todo
search no room for wallflower
- argo navis, probably IPS-N
dustgrave
- havelburg IPS-N far from union core
you know
- cressidium


#### non-numbered
argo navis (reddit stated that it's Wolf 359)
karrakis (MATCH)
ras shamra (MATCH)
  new agartha station (fan made Liminal Space LCP)
  abbey cistercia (fan made Golden Age of a Kind)
  salaire (fan made Golden Age of a Kind)
sparr MATCH (also goes by Manaraga / Elbrus)
  mfecane / hyades / maloti cluster (fan made Mfecane)
  tebessa (ignore)
hercynia MISMATCH (Elbrus, used to be south but now north)
  teegarden (fan made Golden Age of a Kind)
  yalaris (ignore)
  iridia (fan made Field Guide to Iridia)
  castor & pollux (fan made Field Guide to Castor & Pollux)
havelburg
  le reve (ignore)
  moku'meng (ignore)
  suldan (fan made Field Guide to Suldan)
cressidium
  nonov (ignore)
pleiades (real world star)
  myranis (ignore)

rao co station MATCH (LR)
calliope (LR)

Dawn throne (AUN)
Cornucopia MATCH (AUN)

#### numbered
- 1 = alpha centauri (ignore)
  - 17 = new madrassa (3rd party itch.io LCP creator. but is present in starwall's map, at Rao Co)



- 2 = khayradin (KTB capital for house of stone, hagiographic, MATCH)
- 3 = Ispahsalar (KTB capital of house of glass, federalist, MATCH)
- 4 = tilimsan (KTB capital for the house of sand, hagiographic, MATCH)
- 5 = eyalet-a (ktb, moon, capital for the concern house of smoke, federalist, MATCH)
- 6 = begum (ktb capital for house of moments, fedarlist, MATCH)
- 7 = umara (ktb capital for house of water, republican, MATCH)
- 8 = bo (ktb capital of house of dust, republican, MATCH)

  - 18 = viridian (ktb, lancer tatics)
  - 19 = longmont (ktb)
- 20 = crowngarden / Montcalhourn / Jabal (ktb, DS7, house of sand, conquered during interest war) DONE
- 21 = upper laurent / Xirimiri (ktb, DS8, house of stone/sand) DONE
- 22 = san simeon (ktb house of promise, republican) DONE
- 23 = crossland (ktb, DS10, house of remembrance) DONE
- 24 = gloria (ktb, DS11 house of remembrance) DONE

karrakis = KTB house of order, capital
Arrudye = KTB, a moon capital for the house of remembrance



LORE = HA capitol is Ras Shamra
- 9 = ugarit (ha, core world close to capitol)
- 10 = seridan (ha, core world close to capitol)
- 11 = [Sheridan] Amurru (ha, core world close to capitol)
- 12 = eber-nari (ha, core world close to capitol)
- 13 = whiteharbor (ha, core world close to capitol)
- 14 = harrison's world / Wali / Rosegift (ha, DS1 )
- 15 = arkady II / Underthrone / Barr (ha, DS2)
- 16 = cruz's landing / Stone Harbor / Hadii (ha, DS3)
- 25 = new creighton / Odeland / Alif-Baa (ha, DS12 field guide states this is not HA but lcoal gov't)


FAN MATERIAL

- 26 = corriga (aun)
- 27 = auguardia (aun)
- 28 = soss (aun)
- 29 = mara (aun)
- 30 = grada (aun)

LORE = https://mega.nz/folder/2tlRRASC#5oUA7XgtL55K9sRTpk_KyA
https://docs.google.com/document/d/1nQ7nZqUFarE2ECW0973xhfI15dlAjT44deyNdXQ-z0c/edit
https://drive.google.com/file/d/1m9KVbImUBD8aXkO8O9KuTGyZmIceYkWk/view
each house KTB has a associated color and symbol (major houses discord edition)
- blinks are usually by stars
- Hercynia  does not have a blink gate in its system (1.5 LY away)
- janeunderscore / starwall (he/him)


## Part 2
### Actions
- Add a gate called "Aconcagua" to Cradle
- Add a prop for cities
- add a prop for capitol
- use a new type of station, go through and mark all stations
- use a new type of star, go through and mark all stars that Jane has
- go through and mark all capitols (Use Line and Jane maps)
- Venus
	- Venera Final (city)
	- Morningstar (city)
- Mars
	- Tharsis Civica (city)
- Mercury
	- bombardier (city)
- add Venus
- make destroyed its own prop
- make Creighton a moon
- fix spelling on Umara type. it's spelled Terrestrail
- fix spelling on Ouanoukrim it's spelled Quanoukrim
- add city Karraka to Karrakis
- Karrakis as a capital
- Cradle is capital
- add Ptah (star)
- Ras Shamra is a capital
	- The Arcology (city)
- add the following bodies to Arka Tagh gate
    - Lycea (terrestrial KTB)
    - Ent (moon KTB)
- add the following bodies to  Kunlun Goddess
    - Kanata (star)
    - New Victoria (terrestrial CONTESTED)
    - Nanaimo (moon CONTESTED)
- add the following bodies to Iremel
	- Nanshe (jovian)
    - Ashnan (moon)
    - Lahar (moon)
    - Uttu (moon)
    - Isimud (moon)
    - Agasaya (moon)
- add the following bodies to Ouanoukrim
	- Euphrates (star)
    - Bethel (terrestrial CONTESTED)
    - Syracuse (moon CONTESTED)
    - Ardennes (star)
    - Hercynia (terrestrial CONTESTED)
- add the following bodies to Toubkal
    - Amaterasu (terrestrial)
    - Tsukuyomi (moon)
    - Susano (moon)
- add the following bodies to M'Goun
    - Rabat (terrestrial)
    - Alluwlua (moon)
    - Alhambra (station)
- add the following bodies to Annapurna
    - Parvati (star)
    - Lakshmi (star)
    - Saraswati (star)
    - Ganges (terrestrial)
    - Bhagirathi (moon)
	- Kangchenjuna
    - Messenger-1 (station)
    - Messenger-2 (station IPS-N)
- add the following bodies to Everest
    - Ford (terrestrial)
    - Dark Blue (moon)
- add the following bodies to Kharkhiraa
    - Ventrum (terrestrial KTB CONTESTED)
    - Shah (moon KTB CONTESTED)
    - The Stand (moon KTB CONTESTED)
- add the following bodies to Ladovy stit
    - amundsen (star)
    - framheim (terrestrial)
    - polheim (moon)
- add the following bodies to Moldoveanu
    - Tal Kheer (terrestrial)
    - Balamber (station)
- add the following bodies to Cerro Mohinora
    - abel (star)
    - kane (station)
    - brachium (station)
    - corvidius (terrestrial)
- add the following bodies to Broad Peak
    - Means (jovian CONTESTED)
    - Necessity (moon CONTESTED)
- add the following bodies to Chhogori
    - Mettle (moon)
- add the following bodies to Adams
    - Agamemmnon (moon CONTESTED)
- add the following bodies to Rainier
    - Gan (terrestrial)
    - Canopus (star)
    - UN-DSI6 (station)
- add the following bodies to Rao Co
    - several stations
    - Ynes (moon)
- add the following cities to Cornucopia
    - Boundary Industrial (city)
    - Cornucopia City (city)
    - Garden Port (city)
- add the following cities to Dawn Thrown
    - causeway (city)
    - Glorianna (city)

### Questions
- Is Creighton a moon of Eyalet-1? (Line map suggests it is)
- 2 maps (Line + Jane) place Sparr next to Manaraga gate. Is it there?
- line map suggests that dawn throne is in its own system. Is it?
- should Arka Tagh gate be placed inside KTB territory?
- Elbrus is in a very different spot. Where should it be (has Hercynia)?
- Necessity & Means are in opposite sides. Where should they be?
- Agamemmnon is it in Adams or Broad Peak?
- Rao Co, is it in long rim or dawnline shore?
- cerro gordo (KTB territory?)
- Kharkhiraa (KTB or HA territory?)
- is the dawnlineshore beachead gate destroyed?
- Why are the gates in such different spots?
    - Kongur Tagh
    - Kunlun Goddess
    - Elbrus
    - Iremel
    - Everest
    - Kangchenjunga
    - Cerro Mohinora
