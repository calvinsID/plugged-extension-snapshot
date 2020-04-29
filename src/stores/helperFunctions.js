window.plugged_isProductUrl = function(merchant, url) {
  let urls = {
    kith: [".*://kith.com.*/products/.*", ".*://.*\.kith.com.*/products/.*"],
    nikeCa: [".*://nike.com/ca/t/.*", ".*://.*\.nike.com/ca/t/.*"],
    nikeUs: [".*://nike.com/t/.*", ".*://.*\.nike.com/t/.*"],
    haven: [".*://havenshop.com/.*", ".*://.*\.havenshop.com/.*"],
    livestock: [".*://.*\.deadstock.ca/products/.*", ".*://.*\.deadstock.ca/.*/products/.*", ".*://deadstock.ca/products/.*", ".*://deadstock.ca/.*/products/.*"],
    undefeated: [".*://undefeated.com/products/.*", ".*://undefeated.com/.*/products/.*", ".*://.*\.undefeated.com/products/.*", ".*://.*\.undefeated.com/.*/products/.*"],
    ssenseCa: [".*://ssense.com/en-ca/.*/product/.*", ".*://.*\.ssense.com/en-ca/.*/product/.*"],
    ssenseUs: [".*://ssense.com/en-us/.*/product/.*", ".*://.*\.ssense.com/en-us/.*/product/.*"],
    nomad: [".*://nomadshop.net/.*/products/.*", ".*://.*\.nomadshop.net/.*/products/.*", ".*://nomadshop.net/products/.*", ".*://.*\.nomadshop.net/products/.*"],
    mrPorterCa: [".*://mrporter.com/en-ca/.*/product/.*", ".*://.*\.mrporter.com/en-ca/.*/product/.*", ".*://mrporter.com/en-ca/product/.*", ".*://.*\.mrporter.com/en-ca/product/.*"],
    mrPorterUs: [".*://mrporter.com/en-us/.*/product/.*", ".*://.*\.mrporter.com/en-us/.*/product/.*", ".*://mrporter.com/en-us/product/.*", ".*://.*\.mrporter.com/en-us/product/.*"],
    nrml: [".*://nrml.ca/.*/products/.*", ".*://nrml.ca/products/.*", ".*://.*\.nrml.ca/.*/products/.*", ".*://.*\.nrml.ca/products/.*"],
    sportchek: [".*://sportchek.ca/.*/product/.*", ".*://sportchek.ca/product/.*", ".*://.*\.sportchek.ca/.*/product/.*", ".*://.*\.sportchek.ca/product/.*"],
    adidasCa: [".*://adidas.ca/en/.*\.html", ".*://adidas.ca/en/.*\.html.*", ".*://.*\.adidas.ca/en/.*\.html", ".*://.*\.adidas.ca/en/.*\.html.*"],
    adidasUs: [".*://adidas.com/us/.*\.html", ".*://adidas.com/us/.*\.html.*", ".*://.*\.adidas.com/us/.*\.html", ".*://.*\.adidas.com/us/.*\.html.*"],
    frankAndOak: [".*://frankandoak.com/product/.*", ".*://.*\.frankandoak.com/product/.*"],
    urbanOutfittersCa: [".*://urbanoutfitters.com/en-ca/shop/.*", ".*://.*\.urbanoutfitters.com/en-ca/shop/.*"],
    urbanOutfittersUs: [".*://urbanoutfitters.com/shop/.*", ".*://.*\.urbanoutfitters.com/shop/.*"],
    theBay: [".*://thebay.com/.*/product/.*", ".*://thebay.com/product/.*", ".*://.*\.thebay.com/.*/product/.*", ".*://.*\.thebay.com/product/.*"],
    endCa: [".*://endclothing.com/ca/.*\.html", ".*://endclothing.com/ca/.*\.html.*", ".*://.*\.endclothing.com/ca/.*\.html", ".*://.*\.endclothing.com/ca/.*\.html.*"],
    endUs: [".*://endclothing.com/us/.*\.html", ".*://endclothing.com/us/.*\.html.*", ".*://.*\.endclothing.com/us/.*\.html", ".*://.*\.endclothing.com/us/.*\.html.*"],
    dutil: [".*://dutildenim.com/products/.*", ".*://dutildenim.com/.*/products/.*", ".*://.*\.dutildenim.com/products/.*", ".*://.*\.dutildenim.com/.*/products/.*"],
    allSaintsCa: [".*://ca.allsaints.com/.*colour=.*category=.*", ".*://.*\.ca.allsaints.com/.*colour=.*category=.*"],
    allSaintsUs: [".*://us.allsaints.com/.*colour=.*category=.*", ".*://.*\.us.allsaints.com/.*colour=.*category=.*"],
    altitudeSports: [".*://altitude-sports.com/products/.*", ".*://altitude-sports.com/.*/products/.*", ".*://(?!fr\.).*\.altitude-sports.com/products/.*", ".*://(?!fr\.).*\.altitude-sports.com/.*/products/.*"],
    theLastHunt: [".*://thelasthunt.com/products/.*", ".*://thelasthunt.com/.*/products/.*", ".*://.*\.thelasthunt.com/products/.*", ".*://.*\.thelasthunt.com/.*/products/.*"],
    mackageCa: [".*://mackage.com/ca/en/.*\.html", ".*://mackage.com/ca/en/.*\.html.*", ".*://.*\.mackage.com/ca/en/.*\.html", ".*://.*\.mackage.com/ca/en/.*\.html.*"],
    mackageUs: [".*://mackage.com/us/en/.*\.html", ".*://mackage.com/us/en/.*\.html.*", ".*://.*\.mackage.com/us/en/.*\.html", ".*://.*\.mackage.com/us/en/.*\.html.*"],
    zaraCa: [".*://zara.com/ca/en/.*\.html", ".*://zara.com/ca/en/.*\.html.*", ".*://.*\.zara.com/ca/en/.*\.html", ".*://.*\.zara.com/ca/en/.*\.html.*"],
    zaraUs: [".*://zara.com/us/en/.*\.html", ".*://zara.com/us/en/.*\.html.*", ".*://.*\.zara.com/us/en/.*\.html", ".*://.*\.zara.com/us/en/.*\.html.*"],
    wingsAndHorns: [".*://wingsandhorns.com/products/.*", ".*://wingsandhorns.com/.*/products/.*", ".*://.*\.wingsandhorns.com/products/.*", ".*://.*\.wingsandhorns.com/.*/products/.*"],
    oakAndFortCa: [".*://ca.oakandfort.com/.*", ".*://.*\.ca.oakandfort.com/.*"],
    oakAndFortUs: [".*://oakandfort.com/.*", ".*://(?!ca\.).*\.oakandfort.com/.*"],
    uniqloCa: [".*://uniqlo.com/ca/en/products/.*", ".*://uniqlo.com/ca/en/.*/products/.*", ".*://.*\.uniqlo.com/ca/en/products/.*", ".*://.*\.uniqlo.com/ca/en/.*/products/.*"],
    uniqloUs: [".*://uniqlo.com/us/en/.*\.html", ".*://uniqlo.com/us/en/.*\.html.*", ".*://.*\.uniqlo.com/us/en/.*\.html", ".*://.*\.uniqlo.com/us/en/.*\.html.*"],
    tateAndYoko: [".*://tateandyoko.com/.*/products/.*", ".*://tateandyoko.com/products/.*", ".*://.*\.tateandyoko.com/.*/products/.*", ".*://.*\.tateandyoko.com/products/.*"],
    hmCa: [".*://hm.com/en_ca/productpage.*", ".*://hm.com/en_ca/.*/productpage.*", ".*://.*\.hm.com/en_ca/productpage.*", ".*://.*\.hm.com/en_ca/.*/productpage.*"],
    americanEagleCa: [".*://ae.com/ca/en/.*", ".*://.*\.ae.com/ca/en/.*"],
    adrift: [".*://adriftshop.com/products/.*", ".*://adriftshop.com/.*/products/.*", ".*://.*\.adriftshop.com/products/.*", ".*://.*\.adriftshop.com/.*/products/.*"],
    abercrombieFitchCa: [".*://abercrombie.com/shop/ca/p/.*", ".*://.*\.abercrombie.com/shop/ca/p/.*", ".*://abercrombie.com/shop/ca/.*/p/.*", ".*://.*\.abercrombie.com/shop/ca/.*/p/.*"],
    aldoCa: [".*://aldoshoes.com/ca/en/p/.*", ".*://aldoshoes.com/ca/en/.*/p/.*", ".*://.*\.aldoshoes.com/ca/en/p/.*", ".*://.*\.aldoshoes.com/ca/en/.*/p/.*"],
    asicsCa: [".*://asics.com/ca/en-ca/.*", ".*://.*\.asics.com/ca/en-ca/.*"],
    bananaRepublicCa: ["(?!.*locale=fr_CA).*://bananarepublic.gapcanada.ca/product.*", "(?!.*locale=fr_CA).*://bananarepublic.gapcanada.ca/.*/product.*", "(?!.*locale=fr_CA).*://.*\.bananarepublic.gapcanada.ca/product.*", "(?!.*locale=fr_CA).*://.*\.bananarepublic.gapcanada.ca/.*/product.*"],
    oldNavyCa: ["(?!.*locale=fr_CA).*://oldnavy.gapcanada.ca/product.*", "(?!.*locale=fr_CA).*://oldnavy.gapcanada.ca/.*/product.*", "(?!.*locale=fr_CA).*://.*\.oldnavy.gapcanada.ca/product.*", "(?!.*locale=fr_CA).*://.*\.oldnavy.gapcanada.ca/.*/product.*"],
    blueButtonShop: [".*://bluebuttonshop.com/PDETAILS/.*", ".*://bluebuttonshop.com/.*/PDETAILS/.*", ".*://.*\.bluebuttonshop.com/PDETAILS/.*", ".*://.*\.bluebuttonshop.com/.*/PDETAILS/.*"],
    bonobos: [".*://bonobos.com/products/.*", ".*://bonobos.com/.*/products/.*", ".*://.*\.bonobos.com/products/.*", ".*://.*\.bonobos.com/.*/products/.*"],
    brooklynClothing: [".*://brooklynclothing.com/products/.*", ".*://brooklynclothing.com/.*/products/.*", ".*://.*\.brooklynclothing.com/products/.*", ".*://.*\.brooklynclothing.com/.*/products/.*"],
    browns: [".*://brownsshoes.com/.*", ".*://.*\.brownsshoes.com/.*"],
    calvinKleinCa: [".*://calvinklein.ca/en/.*", ".*://.*\.calvinklein.ca/en/.*"],
    capsule: [".*://capsuletoronto.com/products/.*", ".*://capsuletoronto.com/.*/products/.*", ".*://.*\.capsuletoronto.com/products/.*", ".*://.*\.capsuletoronto.com/.*/products/.*"],
    clubMonacoCa: [".*://clubmonaco.ca/en/.*\.html.*", ".*://clubmonaco.ca/en/.*\.html", ".*://.*\.clubmonaco.ca/en/.*\.html.*", ".*://.*\.clubmonaco.ca/en/.*\.html"],
    cntrbnd: [".*://cntrbndshop.com/products/.*", ".*://cntrbndshop.com/.*/products/.*", ".*://.*\.cntrbndshop.com/products/.*", ".*://.*\.cntrbndshop.com/.*/products/.*"],
    coachCa: [".*://ca.coach.com/en_CA/.*\.html.*", ".*://ca.coach.com/en_CA/.*\.html"],
    courtsideSneakers: [".*://courtsidesneakers.com/products/.*", ".*://courtsidesneakers.com/.*/products/.*", ".*://.*\.courtsidesneakers.com/products/.*", ".*://.*\.courtsidesneakers.com/.*/products/.*"],
    dueWest: [".*://duewest.ca/.*/products/.*", ".*://duewest.ca/products/.*", ".*://.*\.duewest.ca/.*/products/.*", ".*://.*\.duewest.ca/products/.*"],
    dynamiteCa: [".*://dynamiteclothing.com/ca/.*/p/.*", ".*://dynamiteclothing.com/ca/p/.*", ".*://.*\.dynamiteclothing.com/ca/.*/p/.*", ".*://.*\.dynamiteclothing.com/ca/p/.*"],
    eddieBauerCa: [".*://eddiebauer.ca/p/.*", ".*://eddiebauer.ca/.*/p/.*", ".*://.*\.eddiebauer.ca/p/.*", ".*://.*\.eddiebauer.ca/.*/p/.*"],
    garageCa: [".*://garageclothing.com/ca/.*/p/.*", ".*://garageclothing.com/ca/p/.*", ".*://.*\.garageclothing.com/ca/.*/p/.*", ".*://.*\.garageclothing.com/ca/p/.*"],
    famousFootwearCa: ["(?!.*lang=fr-CA).*://famousfootwear.ca/Shopping/ProductDetails.*", "(?!.*lang=fr-CA).*://.*\.famousfootwear.ca/Shopping/ProductDetails.*"],
    footLockerCa: [".*://footlocker.ca/en/product/.*", ".*://.*\.footlocker.ca/en/product/.*"],
    fourHorsemen: [".*://fourhorsemen.ca/.*/products/.*", ".*://fourhorsemen.ca/products/.*", ".*://.*\.fourhorsemen.ca/.*/products/.*", ".*://.*\.fourhorsemen.ca/products/.*"],
    gapCa: ["(?!.*locale=fr_CA).*://gapcanada.ca/product.*", "(?!.*locale=fr_CA).*://gapcanada.ca/.*/product.*", "(?!.*locale=fr_CA).*://.*\.gapcanada.ca/product.*", "(?!.*locale=fr_CA).*://.*\.gapcanada.ca/.*/product.*"],
    aritziaCa: [".*://aritzia.com/en/product/.*", ".*://aritzia.com/en/.*/product/.*", ".*://.*\.aritzia.com/en/product/.*", ".*://.*\.aritzia.com/en/.*/product/.*"],
    farfetchCa: [".*://farfetch.com/ca/.*", ".*://.*\.farfetch.com/ca/.*"],
    gerhard: [".*://gerhardsupply.com/.*", ".*://.*\.gerhardsupply.com/.*"],
    gravitypope: [".*://gravitypope.com/products/.*", ".*://gravitypope.com/.*/products/.*", ".*://.*\.gravitypope.com/products/.*", ".*://.*\.gravitypope.com/.*/products/.*"],
    guessCa: [".*://guess.ca/en/.*", ".*://.*\.guess.ca/en/.*"],
    guessFactoryCa: [".*://guessfactory.ca/en/.*", ".*://.*\.guessfactory.ca/en/.*"],
    gstarCa: [".*://g-star.com/en_ca/.*", ".*://.*\.g-star.com/en_ca/.*"],
    acneStudiosCa: [".*://acnestudios.com/ca/en/.*", ".*://.*\.acnestudios.com/ca/en/.*"],
    harryRosen: [".*://harryrosen.com/en/p/.*", ".*://harryrosen.com/en/.*/p/.*", ".*://.*\.harryrosen.com/en/p/.*", ".*://.*\.harryrosen.com/en/.*/p/.*"],
    hbx: [".*://hbx.com/.*", ".*://.*\.hbx.com/.*"],
    henrySinger: [".*://henrysinger.com/products/.*", ".*://henrysinger.com/.*/products/.*", ".*://.*\.henrysinger.com/products/.*", ".*://.*\.henrysinger.com/.*/products/.*"],
    hunterCa: [".*://hunterboots.com/ca/en_ca/.*", ".*://.*\.hunterboots.com/ca/en_ca/.*"],
    hollisterCa: [".*://hollisterco.com/shop/ca/p/.*", ".*://hollisterco.com/shop/ca/.*/p/.*", ".*://.*\.hollisterco.com/shop/ca/p/.*", ".*://.*\.hollisterco.com/shop/ca/.*/p/.*"],
    influenceuCa: [".*://influenceu.com/en-ca/product/.*", ".*://influenceu.com/en-ca/.*/product/.*", ".*://.*\.influenceu.com/en-ca/product/.*", ".*://.*\.influenceu.com/en-ca/.*/product/.*"],
    jcrewFactoryCa: [".*://factory.jcrew.com/ca/p/.*", ".*://factory.jcrew.com/ca/.*/p/.*", ".*://.*\.factory.jcrew.com/ca/p/.*", ".*://.*\.factory.jcrew.com/ca/.*/p/.*"],
    jcrewCa: [".*://jcrew.com/ca/p/.*", ".*://jcrew.com/ca/.*/p/.*", ".*://.*\.jcrew.com/ca/p/.*", ".*://.*\.jcrew.com/ca/.*/p/.*"],
    bestseller: ["(?!(.*-fr$)|(.*-fr\?)).*://bestsellerclothing.ca/.*", "(?!(.*-fr$)|(.*-fr\?)).*://.*\.bestsellerclothing.ca/.*"],
    bricksAndBonds: [".*://bricksandbonds.ca/.*", ".*://.*\.bricksandbonds.ca/.*"],
    joeFresh: [".*://joefresh.com/ca/.*", ".*://.*\.joefresh.com/ca/.*"],
    kateSpade: [".*://katespade.com/products/.*", ".*://.*\.katespade.com/products/.*"],
    laSenzaCa: ["(?!.*/fr/).*://lasenza.ca/pd/.*", "(?!.*/fr/).*://lasenza.ca/.*/pd/.*", "(?!.*/fr/).*://.*\.lasenza.ca/pd/.*", "(?!.*/fr/).*://.*\.lasenza.ca/.*/pd/.*"],
    lacosteCa: [".*://lacoste.com/ca/en/.*", ".*://.*\.lacoste.com/ca/en/.*"],
    levisCa: [".*://levi.com/CA/en_CA/p/.*", ".*://levi.com/CA/en_CA/.*/p/.*", ".*://.*\.levi.com/CA/en_CA/p/.*", ".*://.*\.levi.com/CA/en_CA/.*/p/.*"],
    lessons: [".*://ca.shoplessons.com/products/.*", ".*://ca.shoplessons.com/.*/products/.*", ".*://.*\.ca.shoplessons.com/products/.*", ".*://.*\.ca.shoplessons.com/.*/products/.*"],
    leoBoutique: [".*://leoboutique.com/.*/products/.*", ".*://leoboutique.com/products/.*", ".*://.*\.leoboutique.com/.*/products/.*", ".*://.*\.leoboutique.com/products/.*"],
    less17: [".*://lessoneseven.com/products/.*", ".*://lessoneseven.com/.*/products/.*", ".*://.*\.lessoneseven.com/products/.*", ".*://.*\.lessoneseven.com/.*/products/.*"],
    lLBeanCa: [".*://llbean.ca/.*", ".*://.*\.llbean.ca/.*"],
    lidsCa: [".*://lids.ca/.*", ".*://(?!fr\.).*\.lids.ca/.*"],
    littleBurgundy: [".*://littleburgundyshoes.com/product/.*", "(?!.*/fr/).*://littleburgundyshoes.com/.*/product/.*", ".*://.*\.littleburgundyshoes.com/product/.*", "(?!.*/fr/).*://.*\.littleburgundyshoes.com/.*/product/.*"],
    lostAndFound: [".*://shoplostfound.com/.*/products/.*", ".*://shoplostfound.com/products/.*", ".*://.*\.shoplostfound.com/.*/products/.*", ".*://.*\.shoplostfound.com/products/.*"],
    lululemonCa: [".*://shop.lululemon.com/p/.*", ".*://shop.lululemon.com/.*/p/.*", ".*://.*\.shop.lululemon.com/p/.*", ".*://.*\.shop.lululemon.com/.*/p/.*"],
    exclucity: [".*://shop.exclucitylife.com/products/.*", ".*://shop.exclucitylife.com/.*/products/.*", ".*://.*\.shop.exclucitylife.com/products/.*", ".*://.*\.shop.exclucitylife.com/.*/products/.*"],
    mangoCa: [".*://shop.mango.com/ca/.*", ".*://.*\.shop.mango.com/ca/.*"],
    marks: [".*://marks.com/en/.*", ".*://.*\.marks.com/en/.*"],
    marsClothing: [".*://marsclothing.ca/products/.*", ".*://marsclothing.ca/.*/products/.*", ".*://.*\.marsclothing.ca/products/.*", ".*://.*\.marsclothing.ca/.*/products/.*"],
    mavi: [".*://ca.mavi.com/products/.*", ".*://ca.mavi.com/.*/products/.*", ".*://.*\.ca.mavi.com/products/.*", ".*://.*\.ca.mavi.com/.*/products/.*"],
    milohShop: [".*://milohshop.com/products/.*", ".*://milohshop.com/.*/products/.*", ".*://.*\.milohshop.com/products/.*", ".*://.*\.milohshop.com/.*/products/.*"],
    michaelKorsCa: ["(?!.*/fr_CA/).*://michaelkors.ca/.*", "(?!.*/fr_CA/).*://.*\.michaelkors.ca/.*"],
    michelBrisson: [".*://michelbrisson.com/.*", ".*://.*\.michelbrisson.com/.*"],
    mooseKnuckles: [".*://mooseknucklescanada.com/en/.*", ".*://.*\.mooseknucklescanada.com/en/.*"],
    mec: [".*://mec.ca/en/.*", ".*://.*\.mec.ca/en/.*"],
    muttonhead: [".*://muttonheadstore.com/products/.*", ".*://muttonheadstore.com/.*/products/.*", ".*://.*\.muttonheadstore.com/products/.*", ".*://.*\.muttonheadstore.com/.*/products/.*"],
    muddyGeorge: [".*://muddygeorge.com/products/.*", ".*://muddygeorge.com/.*/products/.*", ".*://.*\.muddygeorge.com/products/.*", ".*://.*\.muddygeorge.com/.*/products/.*"],
    neighbour: [".*://shopneighbour.com/products/.*", ".*://shopneighbour.com/.*/products/.*", ".*://.*\.shopneighbour.com/products/.*", ".*://.*\.shopneighbour.com/.*/products/.*"],
    neimanMarcusCa: [".*://neimanmarcus.com/en-ca/p/.*", ".*://neimanmarcus.com/en-ca/.*/p/.*", ".*://.*\.neimanmarcus.com/en-ca/p/.*", ".*://.*\.neimanmarcus.com/en-ca/.*/p/.*"],
    newBalanceCa: ["(?!.*/fr_ca/).*://newbalance.ca/en_ca/.*", "(?!.*/fr_ca/).*://.*\.newbalance.ca/en_ca/.*"],
    theNorthFaceCa: ["(?!.*-fr-ca).*://thenorthface.com/.*", "(?!.*-fr-ca).*://.*\.thenorthface.com/.*"],
    offTheHook: [".*://offthehook.ca/products/.*", ".*://offthehook.ca/.*/products/.*", ".*://.*\.offthehook.ca/products/.*", ".*://.*\.offthehook.ca/.*/products/.*"],
    overTheRainbow: [".*://rainbowjeans.com/products/.*", ".*://rainbowjeans.com/.*/products/.*", ".*://.*\.rainbowjeans.com/products/.*", ".*://.*\.rainbowjeans.com/.*/products/.*"],
    palmAngelsCa: [".*://store.palmangels.com/en/CA/products/.*", ".*://store.palmangels.com/en/CA/.*/products/.*", ".*://.*\.store.palmangels.com/en/CA/products/.*", ".*://.*\.store.palmangels.com/en/CA/.*/products/.*"],
    pandoraCa: ["(?!.*/fr/).*://ca.pandora.net/en/.*", "(?!.*/fr/).*://.*\.ca.pandora.net/en/.*"],
    patagoniaCa: [".*://patagonia.ca/product/.*", ".*://patagonia.ca/.*/product/.*", ".*://.*\.patagonia.ca/product/.*", ".*://.*\.patagonia.ca/.*/product/.*"],
    peaceCollective: [".*://peace-collective.com/products/.*", ".*://peace-collective.com/.*/products/.*", ".*://.*\.peace-collective.com/products/.*", ".*://.*\.peace-collective.com/.*/products/.*"],
    pumaCa: [".*://ca.puma.com/en/ca/pd/.*", ".*://ca.puma.com/en/ca/.*/pd/.*", ".*://.*\.ca.puma.com/en/ca/pd/.*", ".*://.*\.ca.puma.com/en/ca/.*/pd/.*"],
    realSports: [".*://shop.realsports.ca/.*", ".*://.*\.shop.realsports.ca/.*"],
    reebokCa: [".*://reebok.ca/en/.*", ".*://.*\.reebok.ca/en/.*"],
    common: [".*://commonshop.com/products/.*", ".*://commonshop.com/.*/products/.*", ".*://.*\.commonshop.com/products/.*", ".*://.*\.commonshop.com/.*/products/.*"],
    rootsCa: [".*://roots.com/ca/en/.*", ".*://.*\.roots.com/ca/en/.*"],
    rodenGray: [".*://rodengray.com/products/.*", ".*://rodengray.com/.*/products/.*", ".*://.*\.rodengray.com/products/.*", ".*://.*\.rodengray.com/.*/products/.*"],
    rooney: [".*://rooneyshop.com/products/.*", ".*://rooneyshop.com/.*/products/.*", ".*://.*\.rooneyshop.com/products/.*", ".*://.*\.rooneyshop.com/.*/products/.*"],
    saksFifthAvenueCa: [".*://saksfifthavenue.com/.*", ".*://.*\.saksfifthavenue.com/.*", ".*://saks.com/.*", ".*://.*\.saks.com/.*"],
    saksOffFifthCa: [".*://saksoff5th.com/.*", ".*://.*\.saksoff5th.com/.*"],
    sauconyCa: [".*://saucony.com/CA/en_CA/.*", ".*://.*\.saucony.com/CA/en_CA/.*"],
    sephoraCa: [".*://sephora.com/ca/en/product/.*", ".*://sephora.com/ca/en/.*/product/.*", ".*://.*\.sephora.com/ca/en/product/.*", ".*://.*\.sephora.com/ca/en/.*/product/.*"],
    sportsExperts: [".*://sportsexperts.ca/en-CA/.*", ".*://.*\.sportsexperts.ca/en-CA/.*"],
    atmosphere: [".*://atmosphere.ca/.*", ".*://.*\.atmosphere.ca/.*"],
    springCa: [".*://callitspring.com/ca/en/p/.*", ".*://callitspring.com/ca/en/.*/p/.*", ".*://.*\.callitspring.com/ca/en/p/.*", ".*://.*\.callitspring.com/ca/en/.*/p/.*"],
    steveMaddenCa: [".*://stevemadden.ca/products/.*", ".*://stevemadden.ca/.*/products/.*", ".*://.*\.stevemadden.ca/products/.*", ".*://.*\.stevemadden.ca/.*/products/.*"],
    simonsCa: [".*://simons.ca/en/.*", ".*://.*\.simons.ca/en/.*"],
    solestop: [".*://solestop.com/products/.*", ".*://solestop.com/.*/products/.*", ".*://.*\.solestop.com/products/.*", ".*://.*\.solestop.com/.*/products/.*"],
    softMocCa: [".*://softmoc.com/ca/.*", ".*://.*\.softmoc.com/ca/.*"],
    spierAndMackay: [".*://spierandmackay.com/.*", ".*://.*\.spierandmackay.com/.*"],
    sportingLifeCa: [".*://sportinglife.ca/en-CA/.*", ".*://.*\.sportinglife.ca/en-CA/.*"],
    stillLife: [".*://stilllifeboutique.com/products/.*", ".*://stilllifeboutique.com/.*/products/.*", ".*://.*\.stilllifeboutique.com/products/.*", ".*://.*\.stilllifeboutique.com/.*/products/.*"],
    uncleOtis: [".*://uncleotis.com/.*", ".*://.*\.uncleotis.com/.*"],
    understudy: [".*://understudyshop.ca/products/.*", ".*://understudyshop.ca/.*/products/.*", ".*://.*\.understudyshop.ca/products/.*", ".*://.*\.understudyshop.ca/.*/products/.*"],
    arcteryxCa: [".*://arcteryx.com/ca/en/shop/.*", ".*://arcteryx.com/ca/en/.*/shop/.*", ".*://.*\.arcteryx.com/ca/en/shop/.*", ".*://.*\.arcteryx.com/ca/en/.*/shop/.*"],
    bestBuyCa: [".*://bestbuy.ca/en-ca/product/.*", ".*://bestbuy.ca/en-ca/.*/product/.*", ".*://.*\.bestbuy.ca/en-ca/product/.*", ".*://.*\.bestbuy.ca/en-ca/.*/product/.*"],
    walmartCa: [".*://walmart.ca/.*", ".*://.*\.walmart.ca/.*"],
    herschelCa: ["(?!fr\.).*://herschel.ca/.*", "(?!fr\.).*://.*\.herschel.ca/.*"],
    ikeaCa: [".*://ikea.com/ca/en/p/.*", ".*://ikea.com/ca/en/.*/p/.*", ".*://.*\.ikea.com/ca/en/p/.*", ".*://.*\.ikea.com/ca/en/.*/p/.*"],
    indigoCa: [".*://chapters.indigo.ca/en-ca/.*", ".*://.*\.chapters.indigo.ca/en-ca/.*"],
    theSource: [".*://thesource.ca/en-ca/.*", ".*://.*\.thesource.ca/en-ca/.*"],
    staples: [".*://staples.ca/products/.*", ".*://staples.ca/.*/products/.*", ".*://.*\.staples.ca/products/.*", ".*://.*\.staples.ca/.*/products/.*"],
    canadianTire: [".*://canadiantire.ca/en/.*", ".*://.*\.canadiantire.ca/en/.*"],
    theShoeCompanyCa: [".*://theshoecompany.ca/en/ca/.*", ".*://.*\.theshoecompany.ca/en/ca/.*"],
    designerShoeWarehouseCa: [".*://dsw.ca/en/ca/.*", ".*://.*\.dsw.ca/en/ca/.*"],
    shoeWarehouseCa: [".*://shoewarehouse.ca/en/ca/.*", ".*://.*\.shoewarehouse.ca/en/ca/.*"],
    costcoCa: [".*://costco.ca/.*", ".*://.*\.costco.ca/.*"],
    boutique1861: [".*://1861.ca/.*", ".*://.*\.1861.ca/.*"],
    cleo: [".*://cleo.ca/.*", ".*://.*\.cleo.ca/.*"],
    rickis: [".*://rickis.com/.*", ".*://.*\.rickis.com/.*"],
    holtRenfrew: [".*://holtrenfrew.com/.*", ".*://.*\.holtrenfrew.com/.*"],
    kotn: [".*://kotn.com/.*", ".*://.*\.kotn.com/.*"],
    laCanadienne: [".*://lacanadienneshoes.com/ca_en/.*", ".*://.*\.lacanadienneshoes.com/ca_en/.*"],
    loleCa: [".*://ca-en.lolelife.com/.*", ".*://.*\.ca-en.lolelife.com/.*"],
    rwCo: [".*://rw-co.com/.*", ".*://.*\.rw-co.com/.*"],
    mattAndNatCa: [".*://mattandnat.com/en_ca/.*", ".*://.*\.mattandnat.com/en_ca/.*"],
    laura: [".*://laura.ca/en/.*", ".*://.*\.laura.ca/en/.*"],
    melanieLyne: [".*://melanielyne.com/en/.*", ".*://.*\.melanielyne.com/en/.*"],
    dress911: [".*://dress911.com/.*", ".*://.*\.dress911.com/.*"],
    tobiCa: [".*://tobi.com/ca/.*", ".*://.*\.tobi.com/ca/.*"],
    canadaComputers: [".*://canadacomputers.com/.*", ".*://.*\.canadacomputers.com/.*"],
    visions: [".*://visions.ca/.*", ".*://.*\.visions.ca/.*"],
    toysRUs: [".*://toysrus.ca/en/.*", ".*://.*\.toysrus.ca/en/.*"],
    memoryExpress: [".*://memoryexpress.com/.*", ".*://.*\.memoryexpress.com/.*"],
    mikesComputerShop: [".*://mikescomputershop.com/.*", ".*://.*\.mikescomputershop.com/.*"],
    newegg: [".*://newegg.ca/.*", ".*://.*\.newegg.ca/.*"],
    pcCanada: [".*://pc-canada.com/.*", ".*://.*\.pc-canada.com/.*"],
    vuugo: [".*://vuugo.com/.*", ".*://.*\.vuugo.com/.*"],
  }

  if (merchant === "all") {
    for (let property in urls) {
      for (let i = 0; i < urls[property].length; i++) {
        if (url.match(urls[property][i])) {
          return true;
        }
      }
    }
    return false;
  } else {
    if (merchant in urls) {
      for (let i = 0; i < urls[merchant].length; i++) {
        if (url.match(urls[merchant][i])) {
          return true;
        }
      }
    }
    return false;
  }
}

window.plugged_isMerchantUrl = function(merchant, url) {
  let urls = {
    kith: [".*://kith.com", ".*://kith.com/", ".*://kith.com/.*", ".*://.*\.kith.com", ".*://.*\.kith.com/", ".*://.*\.kith.com/.*"],
    nikeCa: [".*://nike.com/ca/(?!fr/)", ".*://nike.com/ca/(?!fr/).*", ".*://.*\.nike.com/ca/(?!fr/)", ".*://.*\.nike.com/ca/(?!fr/).*"],
    nikeUs: [".*://nike.com/t/", ".*://nike.com/t/.*", ".*://.*\.nike.com/t/", ".*://.*\.nike.com/t/.*", ".*://nike.com/w/", ".*://nike.com/w/.*", ".*://.*\.nike.com/w/", ".*://.*\.nike.com/w/.*"],
    haven: [".*://havenshop.com/", ".*://havenshop.com/.*", ".*://.*\.havenshop.com/", ".*://.*\.havenshop.com/.*"],
    livestock: [".*://deadstock.ca/", ".*://deadstock.ca/.*", ".*://.*\.deadstock.ca/", ".*://.*\.deadstock.ca/.*"],
    undefeated: [".*://undefeated.com/", ".*://undefeated.com/.*", ".*://.*\.undefeated.com/", ".*://.*\.undefeated.com/.*"],
    ssenseCa: [".*://ssense.com/en-ca", ".*://ssense.com/en-ca/.*", ".*://.*\.ssense.com/en-ca", ".*://.*\.ssense.com/en-ca/.*"],
    ssenseUs: [".*://ssense.com/en-us", ".*://ssense.com/en-us/.*", ".*://.*\.ssense.com/en-us", ".*://.*\.ssense.com/en-us/.*"],
    nomad: [".*://nomadshop.net", ".*://nomadshop.net/", ".*://nomadshop.net/.*", ".*://.*\.nomadshop.net", ".*://.*\.nomadshop.net/", ".*://.*\.nomadshop.net/.*"],
    mrPorterCa: [".*://mrporter.com/en-ca", ".*://mrporter.com/en-ca/.*", ".*://.*\.mrporter.com/en-ca", ".*://.*\.mrporter.com/en-ca/.*"],
    mrPorterUs: [".*://mrporter.com/en-us", ".*://mrporter.com/en-us/.*", ".*://.*\.mrporter.com/en-us", ".*://.*\.mrporter.com/en-us/.*"],
    nrml: [".*://nrml.ca", ".*://nrml.ca/", ".*://nrml.ca/.*", ".*://.*\.nrml.ca", ".*://.*\.nrml.ca/", ".*://.*\.nrml.ca/.*"],
    sportchek: [".*://sportchek.ca", ".*://sportchek.ca/", ".*://sportchek.ca/.*", ".*://.*\.sportchek.ca", ".*://.*\.sportchek.ca/", ".*://.*\.sportchek.ca/.*"],
    adidasCa: [".*://adidas.ca/en", ".*://adidas.ca/en/", ".*://adidas.ca/en/.*", ".*://.*\.adidas.ca/en", ".*://.*\.adidas.ca/en/", ".*://.*\.adidas.ca/en/.*"],
    adidasUs: [".*://adidas.com/us", ".*://adidas.com/us/", ".*://adidas.com/us/.*", ".*://.*\.adidas.com/us", ".*://.*\.adidas.com/us/", ".*://.*\.adidas.com/us/.*"],
    frankAndOak: [".*://frankandoak.com/(?!fr/)", ".*://frankandoak.com/(?!fr/).*", ".*://.*\.frankandoak.com/(?!fr/)", ".*://.*\.frankandoak.com/(?!fr/).*"],
    urbanOutfittersCa: [".*://urbanoutfitters.com/en-ca", ".*://urbanoutfitters.com/en-ca/", ".*://urbanoutfitters.com/en-ca/.*", ".*://.*\.urbanoutfitters.com/en-ca", ".*://.*\.urbanoutfitters.com/en-ca/", ".*://.*\.urbanoutfitters.com/en-ca/.*"],
    urbanOutfittersUs: [".*://urbanoutfitters.com", ".*://urbanoutfitters.com/", ".*://urbanoutfitters.com/(?!(en-ca\/)|(en-gb\/)).*", ".*://.*\.urbanoutfitters.com", ".*://.*\.urbanoutfitters.com/", ".*://.*\.urbanoutfitters.com/(?!(en-ca\/)|(en-gb\/)).*"],
    theBay: [".*://thebay.com", ".*://thebay.com/", ".*://thebay.com/.*", ".*://.*\.thebay.com", ".*://.*\.thebay.com/", ".*://.*\.thebay.com/.*"],
    endCa: [".*://endclothing.com/ca", ".*://endclothing.com/ca/", ".*://endclothing.com/ca/.*", ".*://.*\.endclothing.com/ca", ".*://.*\.endclothing.com/ca/", ".*://.*\.endclothing.com/ca/.*"],
    endUs: [".*://endclothing.com/us", ".*://endclothing.com/us/", ".*://endclothing.com/us/.*", ".*://.*\.endclothing.com/us", ".*://.*\.endclothing.com/us/", ".*://.*\.endclothing.com/us/.*"],
    dutil: [".*://dutildenim.com", ".*://dutildenim.com/", ".*://dutildenim.com/.*", ".*://.*\.dutildenim.com", ".*://.*\.dutildenim.com/", ".*://.*\.dutildenim.com/.*"],
    allSaintsCa: [".*://ca.allsaints.com", ".*://ca.allsaints.com/", ".*://ca.allsaints.com/.*", ".*://.*\.ca.allsaints.com", ".*://.*\.ca.allsaints.com/", ".*://.*\.ca.allsaints.com/.*"],
    allSaintsUs: [".*://us.allsaints.com", ".*://us.allsaints.com/", ".*://us.allsaints.com/.*", ".*://.*\.us.allsaints.com", ".*://.*\.us.allsaints.com/", ".*://.*\.us.allsaints.com/.*"],
    altitudeSports: [".*://altitude-sports.com", ".*://altitude-sports.com/", ".*://altitude-sports.com/.*", ".*://(?!fr.).*\.altitude-sports.com", ".*://(?!fr.).*\.altitude-sports.com/", ".*://(?!fr.).*\.altitude-sports.com/.*"],
    theLastHunt: [".*://thelasthunt.com", ".*://thelasthunt.com/", ".*://thelasthunt.com/.*", ".*://.*\.thelasthunt.com", ".*://.*\.thelasthunt.com/", ".*://.*\.thelasthunt.com/.*"],
    mackageCa: [".*://mackage.com/ca/en", ".*://mackage.com/ca/en/", ".*://mackage.com/ca/en/.*", ".*://.*\.mackage.com/ca/en", ".*://.*\.mackage.com/ca/en/", ".*://.*\.mackage.com/ca/en/.*"],
    mackageUs: [".*://mackage.com/us/en", ".*://mackage.com/us/en/", ".*://mackage.com/us/en/.*", ".*://.*\.mackage.com/us/en", ".*://.*\.mackage.com/us/en/", ".*://.*\.mackage.com/us/en/.*"],
    zaraCa: [".*://zara.com/ca", ".*://zara.com/ca/", ".*://zara.com/ca/en", ".*://zara.com/ca/en/", ".*://zara.com/ca/en/.*",
      ".*://.*\.zara.com/ca", ".*://.*\.zara.com/ca/", ".*://.*\.zara.com/ca/en", ".*://.*\.zara.com/ca/en/", ".*://.*\.zara.com/ca/en/.*"],
    zaraUs: [".*://zara.com/us", ".*://zara.com/us/", ".*://zara.com/us/en", ".*://zara.com/us/en/", ".*://zara.com/us/en/.*",
      ".*://.*\.zara.com/us", ".*://.*\.zara.com/us/", ".*://.*\.zara.com/us/en", ".*://.*\.zara.com/us/en/", ".*://.*\.zara.com/us/en/.*"],
    wingsAndHorns: [".*://wingsandhorns.com", ".*://wingsandhorns.com/", ".*://wingsandhorns.com/.*", ".*://.*\.wingsandhorns.com", ".*://.*\.wingsandhorns.com/", ".*://.*\.wingsandhorns.com/.*"],
    oakAndFortCa: [".*://ca.oakandfort.com", ".*://ca.oakandfort.com/", ".*://ca.oakandfort.com/.*", ".*://.*\.ca.oakandfort.com", ".*://.*\.ca.oakandfort.com/", ".*://.*\.ca.oakandfort.com/.*"],
    oakAndFortUs: [".*://oakandfort.com", ".*://oakandfort.com/", ".*://oakandfort.com/.*", ".*://(?!ca\.).*\.oakandfort.com", ".*://(?!ca\.).*\.oakandfort.com/", ".*://(?!ca\.).*\.oakandfort.com/.*"],
    uniqloCa: [".*://uniqlo.com/ca/en", ".*://uniqlo.com/ca/en/", ".*://uniqlo.com/ca/en/.*", ".*://.*\.uniqlo.com/ca/en", ".*://.*\.uniqlo.com/ca/en/", ".*://.*\.uniqlo.com/ca/en/.*"],
    uniqloUs: [".*://uniqlo.com/us/en", ".*://uniqlo.com/us/en/", ".*://uniqlo.com/us/en/.*", ".*://.*\.uniqlo.com/us/en", ".*://.*\.uniqlo.com/us/en/", ".*://.*\.uniqlo.com/us/en/.*"],
    tateAndYoko: [".*://tateandyoko.com", ".*://tateandyoko.com/", ".*://tateandyoko.com/.*", ".*://.*\.tateandyoko.com", ".*://.*\.tateandyoko.com/", ".*://.*\.tateandyoko.com/.*"],
    hmCa: [".*://hm.com/en_ca", ".*://hm.com/en_ca/", ".*://hm.com/en_ca/.*", ".*://.*\.hm.com/en_ca", ".*://.*\.hm.com/en_ca/", ".*://.*\.hm.com/en_ca/.*"],
    americanEagleCa: [".*://ae.com/ca/en", ".*://ae.com/ca/en/", ".*://ae.com/ca/en/.*", ".*://.*\.ae.com/ca/en", ".*://.*\.ae.com/ca/en/", ".*://.*\.ae.com/ca/en/.*"],
    adrift: [".*://adriftshop.com", ".*://adriftshop.com/", ".*://adriftshop.com/.*", ".*://.*\.adriftshop.com", ".*://.*\.adriftshop.com/", ".*://.*\.adriftshop.com/.*"],
    abercrombieFitchCa: [".*://abercrombie.com/shop/ca", ".*://abercrombie.com/shop/ca/", ".*://abercrombie.com/shop/ca/.*", ".*://.*\.abercrombie.com/shop/ca", ".*://.*\.abercrombie.com/shop/ca/", ".*://.*\.abercrombie.com/shop/ca/.*"],
    aldoCa: [".*://aldoshoes.com/ca/en", ".*://aldoshoes.com/ca/en/", ".*://aldoshoes.com/ca/en/.*", ".*://.*\.aldoshoes.com/ca/en", ".*://.*\.aldoshoes.com/ca/en/", ".*://.*\.aldoshoes.com/ca/en/.*"],
    asicsCa: [".*://asics.com/ca/en-ca", ".*://asics.com/ca/en-ca/", ".*://asics.com/ca/en-ca/.*", ".*://.*\.asics.com/ca/en-ca", ".*://.*\.asics.com/ca/en-ca/", ".*://.*\.asics.com/ca/en-ca/.*"],
    bananaRepublicCa: [".*://bananarepublic.ca", ".*://bananarepublic.ca/", ".*://bananarepublic.ca/.*", ".*://bananarepublic.gapcanada.ca", ".*://bananarepublic.gapcanada.ca/", ".*://bananarepublic.gapcanada.ca/.*",
      ".*://.*\.bananarepublic.ca", ".*://.*\.bananarepublic.ca/", ".*://.*\.bananarepublic.ca/.*", ".*://.*\.bananarepublic.gapcanada.ca", ".*://.*\.bananarepublic.gapcanada.ca/", ".*://.*\.bananarepublic.gapcanada.ca/.*"],
    oldNavyCa: [".*://oldnavy.ca", ".*://oldnavy.ca/", ".*://oldnavy.ca/.*", ".*://.*\.oldnavy.ca", ".*://.*\.oldnavy.ca/", ".*://.*\.oldnavy.ca/.*",
      ".*://oldnavy.gapcanada.ca", ".*://oldnavy.gapcanada.ca/", ".*://oldnavy.gapcanada.ca/.*", ".*://.*\.oldnavy.gapcanada.ca", ".*://.*\.oldnavy.gapcanada.ca/", ".*://.*\.oldnavy.gapcanada.ca/.*"],
    blueButtonShop: [".*://bluebuttonshop.com", ".*://bluebuttonshop.com/", ".*://bluebuttonshop.com/.*", ".*://.*\.bluebuttonshop.com", ".*://.*\.bluebuttonshop.com/", ".*://.*\.bluebuttonshop.com/.*"],  
    bonobos: [".*://bonobos.com", ".*://bonobos.com/", ".*://bonobos.com/.*", ".*://.*\.bonobos.com", ".*://.*\.bonobos.com/", ".*://.*\.bonobos.com/.*"],
    brooklynClothing: [".*://brooklynclothing.com", ".*://brooklynclothing.com/", ".*://brooklynclothing.com/.*", ".*://.*\.brooklynclothing.com", ".*://.*\.brooklynclothing.com/", ".*://.*\.brooklynclothing.com/.*"],
    browns: [".*://brownsshoes.com", ".*://brownsshoes.com/", ".*://brownsshoes.com/.*", ".*://.*\.brownsshoes.com", ".*://.*\.brownsshoes.com/", ".*://.*\.brownsshoes.com/.*"],
    calvinKleinCa: [".*://calvinklein.ca/en", ".*://calvinklein.ca/en/", ".*://calvinklein.ca/en/.*", ".*://.*\.calvinklein.ca/en", ".*://.*\.calvinklein.ca/en/", ".*://.*\.calvinklein.ca/en/.*"],
    capsule: [".*://capsuletoronto.com", ".*://capsuletoronto.com/", ".*://capsuletoronto.com/.*", ".*://.*\.capsuletoronto.com", ".*://.*\.capsuletoronto.com/", ".*://.*\.capsuletoronto.com/.*"],
    clubMonacoCa: [".*://clubmonaco.ca/en", ".*://clubmonaco.ca/en/", ".*://clubmonaco.ca/en/.*", ".*://.*\.clubmonaco.ca/en", ".*://.*\.clubmonaco.ca/en/", ".*://.*\.clubmonaco.ca/en/.*"],
    cntrbnd: [".*://cntrbndshop.com", ".*://cntrbndshop.com/", ".*://cntrbndshop.com/.*", ".*://.*\.cntrbndshop.com", ".*://.*\.cntrbndshop.com/", ".*://.*\.cntrbndshop.com/.*"],
    coachCa: [".*://ca.coach.com", ".*://ca.coach.com/", ".*://ca.coach.com/en_CA", ".*://ca.coach.com/en_CA/", ".*://ca.coach.com/en_CA/.*"],
    courtsideSneakers: [".*://courtsidesneakers.com", ".*://courtsidesneakers.com/", ".*://courtsidesneakers.com/.*", ".*://.*\.courtsidesneakers.com", ".*://.*\.courtsidesneakers.com/", ".*://.*\.courtsidesneakers.com/.*"],
    dueWest: [".*://duewest.ca", ".*://duewest.ca/", ".*://duewest.ca/.*", ".*://.*\.duewest.ca", ".*://.*\.duewest.ca/", ".*://.*\.duewest.ca/.*"],
    dynamiteCa: [".*://dynamiteclothing.com/ca", ".*://dynamiteclothing.com/ca/", ".*://dynamiteclothing.com/ca/.*", ".*://.*\.dynamiteclothing.com/ca", ".*://.*\.dynamiteclothing.com/ca/", ".*://.*\.dynamiteclothing.com/ca/.*"],
    eddieBauerCa: [".*://eddiebauer.ca", ".*://eddiebauer.ca/", ".*://eddiebauer.ca/.*", ".*://.*\.eddiebauer.ca", ".*://.*\.eddiebauer.ca/", ".*://.*\.eddiebauer.ca/.*"],
    garageCa: [".*://garageclothing.com/ca", ".*://garageclothing.com/ca/", ".*://garageclothing.com/ca/.*", ".*://.*\.garageclothing.com/ca", ".*://.*\.garageclothing.com/ca/", ".*://.*\.garageclothing.com/ca/.*"],
    famousFootwearCa: ["(?!.*lang=fr-CA).*://famousfootwear.ca", "(?!.*lang=fr-CA).*://famousfootwear.ca/", "(?!.*lang=fr-CA).*://famousfootwear.ca/.*", "(?!.*lang=fr-CA).*://.*\.famousfootwear.ca", "(?!.*lang=fr-CA).*://.*\.famousfootwear.ca/", "(?!.*lang=fr-CA).*://.*\.famousfootwear.ca/.*"],
    footLockerCa: [".*://footlocker.ca", ".*://footlocker.ca/(?!fr/)", ".*://footlocker.ca/(?!fr/).*", ".*://.*\.footlocker.ca", ".*://.*\.footlocker.ca/(?!fr/)", ".*://.*\.footlocker.ca/(?!fr/).*"],
    fourHorsemen: [".*://fourhorsemen.ca", ".*://fourhorsemen.ca/", ".*://fourhorsemen.ca/.*", ".*://.*\.fourhorsemen.ca", ".*://.*\.fourhorsemen.ca/", ".*://.*\.fourhorsemen.ca/.*"],
    gapCa: ["(?!.*locale=fr_CA).*://gapcanada.ca", "(?!.*locale=fr_CA).*://gapcanada.ca/", "(?!.*locale=fr_CA).*://gapcanada.ca/.*", "(?!.*locale=fr_CA).*://.*\.gapcanada.ca", "(?!.*locale=fr_CA).*://.*\.gapcanada.ca/", "(?!.*locale=fr_CA).*://.*\.gapcanada.ca/.*"],
    aritziaCa: [".*://aritzia.com/en", ".*://aritzia.com/en/", ".*://aritzia.com/en/.*", ".*://.*\.aritzia.com/en", ".*://.*\.aritzia.com/en/", ".*://.*\.aritzia.com/en/.*"],
    farfetchCa: [".*://farfetch.com/ca", ".*://farfetch.com/ca/", ".*://farfetch.com/ca/.*", ".*://.*\.farfetch.com/ca", ".*://.*\.farfetch.com/ca/", ".*://.*\.farfetch.com/ca/.*"],
    gerhard: [".*://gerhardsupply.com", ".*://gerhardsupply.com/", ".*://gerhardsupply.com/.*", ".*://.*\.gerhardsupply.com", ".*://.*\.gerhardsupply.com/", ".*://.*\.gerhardsupply.com/.*"],
    gravitypope: [".*://gravitypope.com", ".*://gravitypope.com/", ".*://gravitypope.com/.*", ".*://.*\.gravitypope.com", ".*://.*\.gravitypope.com/", ".*://.*\.gravitypope.com/.*"],
    guessCa: [".*://guess.ca/en", ".*://guess.ca/en/", ".*://guess.ca/en/.*", ".*://.*\.guess.ca/en", ".*://.*\.guess.ca/en/", ".*://.*\.guess.ca/en/.*"],
    guessFactoryCa: [".*://guessfactory.ca/en", ".*://guessfactory.ca/en/", ".*://guessfactory.ca/en/.*", ".*://.*\.guessfactory.ca/en", ".*://.*\.guessfactory.ca/en/", ".*://.*\.guessfactory.ca/en/.*"],
    gstarCa: [".*://g-star.com/en_ca", ".*://g-star.com/en_ca/", ".*://g-star.com/en_ca/.*", ".*://.*\.g-star.com/en_ca", ".*://.*\.g-star.com/en_ca/", ".*://.*\.g-star.com/en_ca/.*"],
    acneStudiosCa: [".*://acnestudios.com/ca/en", ".*://acnestudios.com/ca/en/", ".*://acnestudios.com/ca/en/.*", ".*://.*\.acnestudios.com/ca/en", ".*://.*\.acnestudios.com/ca/en/", ".*://.*\.acnestudios.com/ca/en/.*"],
    harryRosen: [".*://harryrosen.com/en", ".*://harryrosen.com/en/", ".*://harryrosen.com/en/.*", ".*://.*\.harryrosen.com/en", ".*://.*\.harryrosen.com/en/", ".*://.*\.harryrosen.com/en/.*"],
    hbx: [".*://hbx.com", ".*://hbx.com/", ".*://hbx.com/.*", ".*://.*\.hbx.com", ".*://.*\.hbx.com/", ".*://.*\.hbx.com/.*"],
    henrySinger: [".*://henrysinger.com", ".*://henrysinger.com/", ".*://henrysinger.com/.*", ".*://.*\.henrysinger.com", ".*://.*\.henrysinger.com/", ".*://.*\.henrysinger.com/.*"],
    hunterCa: [".*://hunterboots.com/ca/en_ca", ".*://hunterboots.com/ca/en_ca/", ".*://hunterboots.com/ca/en_ca/.*", ".*://.*\.hunterboots.com/ca/en_ca", ".*://.*\.hunterboots.com/ca/en_ca/", ".*://.*\.hunterboots.com/ca/en_ca/.*"],
    hollisterCa: [".*://hollisterco.com/shop/ca", ".*://hollisterco.com/shop/ca/", ".*://hollisterco.com/shop/ca/.*", ".*://.*\.hollisterco.com/shop/ca", ".*://.*\.hollisterco.com/shop/ca/", ".*://.*\.hollisterco.com/shop/ca/.*"],
    influenceuCa: [".*://influenceu.com/en-ca", ".*://influenceu.com/en-ca/", ".*://influenceu.com/en-ca/.*", ".*://.*\.influenceu.com/en-ca", ".*://.*\.influenceu.com/en-ca/", ".*://.*\.influenceu.com/en-ca/.*"],
    jcrewFactoryCa: [".*://factory.jcrew.com/ca", ".*://factory.jcrew.com/ca/", ".*://factory.jcrew.com/ca/.*", ".*://.*\.factory.jcrew.com/ca", ".*://.*\.factory.jcrew.com/ca/", ".*://.*\.factory.jcrew.com/ca/.*"],
    jcrewCa: [".*://jcrew.com/ca", ".*://jcrew.com/ca/", ".*://jcrew.com/ca/.*", ".*://.*\.jcrew.com/ca", ".*://.*\.jcrew.com/ca/", ".*://.*\.jcrew.com/ca/.*"],
    bestseller: ["(?!(.*-fr$)|(.*-fr\?)).*://bestsellerclothing.ca", "(?!(.*-fr$)|(.*-fr\?)).*://bestsellerclothing.ca/", "(?!(.*-fr$)|(.*-fr\?)).*://bestsellerclothing.ca/.*", "(?!(.*-fr$)|(.*-fr\?)).*://.*\.bestsellerclothing.ca", "(?!(.*-fr$)|(.*-fr\?)).*://.*\.bestsellerclothing.ca/", "(?!(.*-fr$)|(.*-fr\?)).*://.*\.bestsellerclothing.ca/.*",
    ".*://jack-jones.ca", ".*://jack-jones.ca/", ".*://jack-jones.ca/.*", ".*://.*\.jack-jones.ca", ".*://.*\.jack-jones.ca/", ".*://.*\.jack-jones.ca/.*"],
    bricksAndBonds: [".*://bricksandbonds.ca", ".*://bricksandbonds.ca/", ".*://bricksandbonds.ca/.*", ".*://.*\.bricksandbonds.ca", ".*://.*\.bricksandbonds.ca/", ".*://.*\.bricksandbonds.ca/.*"],
    joeFresh: [".*://joefresh.com/ca", ".*://joefresh.com/ca/", ".*://joefresh.com/ca/.*", ".*://.*\.joefresh.com/ca", ".*://.*\.joefresh.com/ca/", ".*://.*\.joefresh.com/ca/.*"],
    kateSpade: [".*://katespade.com", ".*://katespade.com/", ".*://katespade.com/.*", ".*://.*\.katespade.com", ".*://.*\.katespade.com/", ".*://.*\.katespade.com/.*"],
    laSenzaCa: ["(?!.*/fr/).*://lasenza.ca", "(?!.*/fr/).*://lasenza.ca/", "(?!.*/fr/).*://lasenza.ca/.*", "(?!.*/fr/).*://.*\.lasenza.ca", "(?!.*/fr/).*://.*\.lasenza.ca/", "(?!.*/fr/).*://.*\.lasenza.ca/.*"],
    lacosteCa: [".*://lacoste.com/ca/en", ".*://lacoste.com/ca/en/", ".*://lacoste.com/ca/en/.*", ".*://.*\.lacoste.com/ca/en", ".*://.*\.lacoste.com/ca/en/", ".*://.*\.lacoste.com/ca/en/.*"],
    levisCa: [".*://levi.com/CA/en_CA", ".*://levi.com/CA/en_CA/", ".*://levi.com/CA/en_CA/.*", ".*://.*\.levi.com/CA/en_CA", ".*://.*\.levi.com/CA/en_CA/", ".*://.*\.levi.com/CA/en_CA/.*"],
    lessons: [".*://ca.shoplessons.com", ".*://ca.shoplessons.com/", ".*://ca.shoplessons.com/.*", ".*://.*\.ca.shoplessons.com", ".*://.*\.ca.shoplessons.com/", ".*://.*\.ca.shoplessons.com/.*"],
    leoBoutique: [".*://leoboutique.com", ".*://leoboutique.com/", ".*://leoboutique.com/.*", ".*://.*\.leoboutique.com", ".*://.*\.leoboutique.com/", ".*://.*\.leoboutique.com/.*"],
    less17: [".*://lessoneseven.com", ".*://lessoneseven.com/", ".*://lessoneseven.com/.*", ".*://.*\.lessoneseven.com", ".*://.*\.lessoneseven.com/", ".*://.*\.lessoneseven.com/.*"],
    lLBeanCa: [".*://llbean.ca", ".*://llbean.ca/", ".*://llbean.ca/.*", ".*://.*\.llbean.ca", ".*://.*\.llbean.ca/", ".*://.*\.llbean.ca/.*"],
    lidsCa: [".*://lids.ca", ".*://lids.ca/", ".*://lids.ca/.*", ".*://(?!fr\.).*\.lids.ca", ".*://(?!fr\.).*\.lids.ca/", ".*://(?!fr\.).*\.lids.ca/.*"],
    littleBurgundy: [".*://littleburgundyshoes.com", ".*://littleburgundyshoes.com/", "(?!.*/fr/).*://littleburgundyshoes.com/.*", ".*://.*\.littleburgundyshoes.com", ".*://.*\.littleburgundyshoes.com/", "(?!.*/fr/).*://.*\.littleburgundyshoes.com/.*"],
    lostAndFound: [".*://shoplostfound.com", ".*://shoplostfound.com/", ".*://shoplostfound.com/.*", ".*://.*\.shoplostfound.com", ".*://.*\.shoplostfound.com/", ".*://.*\.shoplostfound.com/.*"],
    lululemonCa: [".*://shop.lululemon.com", ".*://shop.lululemon.com/", ".*://shop.lululemon.com/.*", ".*://.*\.shop.lululemon.com", ".*://.*\.shop.lululemon.com/", ".*://.*\.shop.lululemon.com/.*"],
    exclucity: [".*://shop.exclucitylife.com", ".*://shop.exclucitylife.com/", ".*://shop.exclucitylife.com/.*", ".*://.*\.shop.exclucitylife.com", ".*://.*\.shop.exclucitylife.com/", ".*://.*\.shop.exclucitylife.com/.*"],
    mangoCa: [".*://shop.mango.com/ca", ".*://shop.mango.com/ca/", "(?!/ca-fr/).*://shop.mango.com/ca/.*", ".*://.*\.shop.mango.com/ca", ".*://.*\.shop.mango.com/ca/", "(?!/ca-fr/).*://.*\.shop.mango.com/ca/.*"],
    marks: ["(?!/fr/).*://marks.com", "(?!/fr/).*://marks.com/", "(?!/fr/).*://marks.com/.*", "(?!/fr/).*://.*\.marks.com", "(?!/fr/).*://.*\.marks.com/", "(?!/fr/).*://.*\.marks.com/.*"],
    marsClothing: [".*://marsclothing.ca", ".*://marsclothing.ca/", ".*://marsclothing.ca/.*", ".*://.*\.marsclothing.ca", ".*://.*\.marsclothing.ca/", ".*://.*\.marsclothing.ca/.*"],
    mavi: [".*://ca.mavi.com", ".*://ca.mavi.com/", ".*://ca.mavi.com/.*", ".*://.*\.ca.mavi.com", ".*://.*\.ca.mavi.com/", ".*://.*\.ca.mavi.com/.*"],
    milohShop: [".*://milohshop.com", ".*://milohshop.com/", ".*://milohshop.com/.*", ".*://.*\.milohshop.com", ".*://.*\.milohshop.com/", ".*://.*\.milohshop.com/.*"],
    michaelKorsCa: ["(?!.*/fr_CA/).*://michaelkors.ca", "(?!.*/fr_CA/).*://michaelkors.ca/", "(?!.*/fr_CA/).*://michaelkors.ca/.*", "(?!.*/fr_CA/).*://.*\.michaelkors.ca", "(?!.*/fr_CA/).*://.*\.michaelkors.ca/", "(?!.*/fr_CA/).*://.*\.michaelkors.ca/.*"],
    michelBrisson: [".*://michelbrisson.com", ".*://michelbrisson.com/", ".*://michelbrisson.com/.*", ".*://.*\.michelbrisson.com", ".*://.*\.michelbrisson.com/", ".*://.*\.michelbrisson.com/.*"],
    mooseKnuckles: [".*://mooseknucklescanada.com/en", ".*://mooseknucklescanada.com/en/", ".*://mooseknucklescanada.com/en/.*", ".*://.*\.mooseknucklescanada.com/en", ".*://.*\.mooseknucklescanada.com/en/", ".*://.*\.mooseknucklescanada.com/en/.*"],
    mec: [".*://mec.ca/en", ".*://mec.ca/en/", ".*://mec.ca/en/.*", ".*://.*\.mec.ca/en", ".*://.*\.mec.ca/en/", ".*://.*\.mec.ca/en/.*"],
    muttonhead: [".*://muttonheadstore.com", ".*://muttonheadstore.com/", ".*://muttonheadstore.com/.*", ".*://.*\.muttonheadstore.com", ".*://.*\.muttonheadstore.com/", ".*://.*\.muttonheadstore.com/.*"],
    muddyGeorge: [".*://muddygeorge.com", ".*://muddygeorge.com/", ".*://muddygeorge.com/.*", ".*://.*\.muddygeorge.com", ".*://.*\.muddygeorge.com/", ".*://.*\.muddygeorge.com/.*"],
    neighbour: [".*://shopneighbour.com", ".*://shopneighbour.com/", ".*://shopneighbour.com/.*", ".*://.*\.shopneighbour.com", ".*://.*\.shopneighbour.com/", ".*://.*\.shopneighbour.com/.*"],
    neimanMarcusCa: [".*://neimanmarcus.com/en-ca", ".*://neimanmarcus.com/en-ca/", ".*://neimanmarcus.com/en-ca/.*", ".*://.*\.neimanmarcus.com/en-ca", ".*://.*\.neimanmarcus.com/en-ca/", ".*://.*\.neimanmarcus.com/en-ca/.*"],
    newBalanceCa: ["(?!.*/fr_ca/).*://newbalance.ca", "(?!.*/fr_ca/).*://newbalance.ca/", "(?!.*/fr_ca/).*://newbalance.ca/.*", "(?!.*/fr_ca/).*://.*\.newbalance.ca", "(?!.*/fr_ca/).*://.*\.newbalance.ca/", "(?!.*/fr_ca/).*://.*\.newbalance.ca/.*"],
    theNorthFaceCa: ["(?!.*-fr-ca).*://thenorthface.com", "(?!.*-fr-ca).*://thenorthface.com/", "(?!.*-fr-ca).*://thenorthface.com/.*", "(?!.*-fr-ca).*://.*\.thenorthface.com", "(?!.*-fr-ca).*://.*\.thenorthface.com/", "(?!.*-fr-ca).*://.*\.thenorthface.com/.*"],
    offTheHook: [".*://offthehook.ca", ".*://offthehook.ca/", ".*://offthehook.ca/.*", ".*://.*\.offthehook.ca", ".*://.*\.offthehook.ca/", ".*://.*\.offthehook.ca/.*"],
    overTheRainbow: [".*://rainbowjeans.com", ".*://rainbowjeans.com/", ".*://rainbowjeans.com/.*", ".*://.*\.rainbowjeans.com", ".*://.*\.rainbowjeans.com/", ".*://.*\.rainbowjeans.com/.*"],
    palmAngelsCa: [".*://store.palmangels.com/en/CA", ".*://store.palmangels.com/en/CA/", ".*://store.palmangels.com/en/CA/.*", ".*://.*\.store.palmangels.com/en/CA", ".*://.*\.store.palmangels.com/en/CA/", ".*://.*\.store.palmangels.com/en/CA/.*"],
    pandoraCa: ["(?!.*/fr/).*//ca.pandora.net", "(?!.*/fr/).*://ca.pandora.net/", "(?!.*/fr/).*://ca.pandora.net/.*", "(?!.*/fr/).*//.*\.ca.pandora.net", "(?!.*/fr/).*://.*\.ca.pandora.net/", "(?!.*/fr/).*://.*\.ca.pandora.net/.*"],
    patagoniaCa: [".*://patagonia.ca", ".*://patagonia.ca/", ".*://patagonia.ca/.*", ".*://.*\.patagonia.ca", ".*://.*\.patagonia.ca/", ".*://.*\.patagonia.ca/.*"],
    peaceCollective: [".*://peace-collective.com", ".*://peace-collective.com/", ".*://peace-collective.com/.*", ".*://.*\.peace-collective.com", ".*://.*\.peace-collective.com/", ".*://.*\.peace-collective.com/.*"],
    pumaCa: [".*://ca.puma.com/en/ca", ".*://ca.puma.com/en/ca/", ".*://ca.puma.com/en/ca/.*", ".*://.*\.ca.puma.com/en/ca", ".*://.*\.ca.puma.com/en/ca/", ".*://.*\.ca.puma.com/en/ca/.*"],
    realSports: [".*://shop.realsports.ca", ".*://shop.realsports.ca/", ".*://shop.realsports.ca/.*", ".*://.*\.shop.realsports.ca", ".*://.*\.shop.realsports.ca/", ".*://.*\.shop.realsports.ca/.*"],
    reebokCa: [".*://reebok.ca/en", ".*://reebok.ca/en/", ".*://reebok.ca/en/.*", ".*://.*\.reebok.ca/en", ".*://.*\.reebok.ca/en/", ".*://.*\.reebok.ca/en/.*"],
    common: [".*://commonshop.com", ".*://commonshop.com/", ".*://commonshop.com/.*", ".*://.*\.commonshop.com", ".*://.*\.commonshop.com/", ".*://.*\.commonshop.com/.*"],
    rootsCa: [".*://roots.com/ca/en", ".*://roots.com/ca/en/", ".*://roots.com/ca/en/.*", ".*://.*\.roots.com/ca/en", ".*://.*\.roots.com/ca/en/", ".*://.*\.roots.com/ca/en/.*"],
    rodenGray: [".*://rodengray.com", ".*://rodengray.com/", ".*://rodengray.com/.*", ".*://.*\.rodengray.com", ".*://.*\.rodengray.com/", ".*://.*\.rodengray.com/.*"],
    rooney: [".*://rooneyshop.com", ".*://rooneyshop.com/", ".*://rooneyshop.com/.*", ".*://.*\.rooneyshop.com", ".*://.*\.rooneyshop.com/", ".*://.*\.rooneyshop.com/.*"],
    saksFifthAvenueCa: [".*://saksfifthavenue.com", ".*://saksfifthavenue.com/", ".*://saksfifthavenue.com/.*", ".*://.*\.saksfifthavenue.com", ".*://.*\.saksfifthavenue.com/", ".*://.*\.saksfifthavenue.com/.*",
      ".*://saks.com", ".*://saks.com/", ".*://saks.com/.*", ".*://.*\.saks.com", ".*://.*\.saks.com/", ".*://.*\.saks.com/.*"],
    saksOffFifthCa: [".*://saksoff5th.com", ".*://saksoff5th.com/", ".*://saksoff5th.com/.*", ".*://.*\.saksoff5th.com", ".*://.*\.saksoff5th.com/", ".*://.*\.saksoff5th.com/.*"],
    sauconyCa: [".*://saucony.com/CA/en_CA", ".*://saucony.com/CA/en_CA/", ".*://saucony.com/CA/en_CA/.*", ".*://.*\.saucony.com/CA/en_CA", ".*://.*\.saucony.com/CA/en_CA/", ".*://.*\.saucony.com/CA/en_CA/.*"],
    sephoraCa: [".*://sephora.com/ca/en", ".*://sephora.com/ca/en/", ".*://sephora.com/ca/en/.*", ".*://.*\.sephora.com/ca/en", ".*://.*\.sephora.com/ca/en/", ".*://.*\.sephora.com/ca/en/.*"],
    sportsExperts: [".*://sportsexperts.ca/en-CA", ".*://sportsexperts.ca/en-CA/", ".*://sportsexperts.ca/en-CA/.*", ".*://.*\.sportsexperts.ca/en-CA", ".*://.*\.sportsexperts.ca/en-CA/", ".*://.*\.sportsexperts.ca/en-CA/.*"],
    atmosphere: [".*://atmosphere.ca", ".*://atmosphere.ca/", ".*://atmosphere.ca/.*", ".*://.*\.atmosphere.ca", ".*://.*\.atmosphere.ca/", ".*://.*\.atmosphere.ca/.*"],
    springCa: [".*://callitspring.com/ca/en", ".*://callitspring.com/ca/en/", ".*://callitspring.com/ca/en/.*", ".*://.*\.callitspring.com/ca/en", ".*://.*\.callitspring.com/ca/en/", ".*://.*\.callitspring.com/ca/en/.*"],
    steveMaddenCa: [".*://stevemadden.ca", ".*://stevemadden.ca/", ".*://stevemadden.ca/.*", ".*://.*\.stevemadden.ca", ".*://.*\.stevemadden.ca/", ".*://.*\.stevemadden.ca/.*"],
    simonsCa: [".*://simons.ca/en", ".*://simons.ca/en/", ".*://simons.ca/en/.*", ".*://.*\.simons.ca/en", ".*://.*\.simons.ca/en/", ".*://.*\.simons.ca/en/.*"],
    solestop: [".*://solestop.com", ".*://solestop.com/", ".*://solestop.com/.*", ".*://.*\.solestop.com", ".*://.*\.solestop.com/", ".*://.*\.solestop.com/.*"],
    softMocCa: [".*://softmoc.com", ".*://softmoc.com/", ".*://softmoc.com/.*", ".*://.*\.softmoc.com", ".*://.*\.softmoc.com/", ".*://.*\.softmoc.com/.*"],
    spierAndMackay: [".*://spierandmackay.com", ".*://spierandmackay.com/", ".*://spierandmackay.com/.*", ".*://.*\.spierandmackay.com", ".*://.*\.spierandmackay.com/", ".*://.*\.spierandmackay.com/.*"],
    sportingLifeCa: [".*://sportinglife.ca/en-CA", ".*://sportinglife.ca/en-CA/", ".*://sportinglife.ca/en-CA/.*", ".*://.*\.sportinglife.ca/en-CA", ".*://.*\.sportinglife.ca/en-CA/", ".*://.*\.sportinglife.ca/en-CA/.*"],
    stillLife: [".*://stilllifeboutique.com", ".*://stilllifeboutique.com/", ".*://stilllifeboutique.com/.*", ".*://.*\.stilllifeboutique.com", ".*://.*\.stilllifeboutique.com/", ".*://.*\.stilllifeboutique.com/.*"],
    uncleOtis: [".*://uncleotis.com", ".*://uncleotis.com/", ".*://uncleotis.com/.*", ".*://.*\.uncleotis.com", ".*://.*\.uncleotis.com/", ".*://.*\.uncleotis.com/.*"],
    understudy: [".*://understudyshop.ca", ".*://understudyshop.ca/", ".*://understudyshop.ca/.*", ".*://.*\.understudyshop.ca", ".*://.*\.understudyshop.ca/", ".*://.*\.understudyshop.ca/.*"],
    arcteryxCa: [".*://arcteryx.com/ca/en", ".*://arcteryx.com/ca/en/", ".*://arcteryx.com/ca/en/.*", ".*://.*\.arcteryx.com/ca/en", ".*://.*\.arcteryx.com/ca/en/", ".*://.*\.arcteryx.com/ca/en/.*"],
    bestBuyCa: [".*://bestbuy.ca/en-ca", ".*://bestbuy.ca/en-ca/", ".*://bestbuy.ca/en-ca/.*", ".*://.*\.bestbuy.ca/en-ca", ".*://.*\.bestbuy.ca/en-ca/", ".*://.*\.bestbuy.ca/en-ca/.*"],
    walmartCa: [".*://walmart.ca", ".*://walmart.ca/", ".*://walmart.ca/.*", ".*://.*\.walmart.ca", ".*://.*\.walmart.ca/", ".*://.*\.walmart.ca/.*"],
    herschelCa: ["(?!fr\.).*://herschel.ca", "(?!fr\.).*://herschel.ca/", "(?!fr\.).*://herschel.ca/.*", "(?!fr\.).*://.*\.herschel.ca", "(?!fr\.).*://.*\.herschel.ca/", "(?!fr\.).*://.*\.herschel.ca/.*"],
    ikeaCa: [".*://ikea.com", ".*://ikea.com/", ".*://ikea.com/.*", ".*://.*\.ikea.com", ".*://.*\.ikea.com/", ".*://.*\.ikea.com/.*"],
    indigoCa: [".*://chapters.indigo.ca/en-ca", ".*://chapters.indigo.ca/en-ca/", ".*://chapters.indigo.ca/en-ca/.*", ".*://.*\.chapters.indigo.ca/en-ca", ".*://.*\.chapters.indigo.ca/en-ca/", ".*://.*\.chapters.indigo.ca/en-ca/.*"],
    theSource: [".*://thesource.ca/en-ca", ".*://thesource.ca/en-ca/", ".*://thesource.ca/en-ca/.*", ".*://.*\.thesource.ca/en-ca", ".*://.*\.thesource.ca/en-ca/", ".*://.*\.thesource.ca/en-ca/.*"],
    staples: [".*://staples.ca", ".*://staples.ca/", ".*://staples.ca/.*", ".*://.*\.staples.ca", ".*://.*\.staples.ca/", ".*://.*\.staples.ca/.*"],
    canadianTire: [".*://canadiantire.ca/en", ".*://canadiantire.ca/en/", ".*://canadiantire.ca/en/.*", ".*://.*\.canadiantire.ca/en", ".*://.*\.canadiantire.ca/en/", ".*://.*\.canadiantire.ca/en/.*"],
    theShoeCompanyCa: [".*://theshoecompany.ca/en/ca", ".*://theshoecompany.ca/en/ca/", ".*://theshoecompany.ca/en/ca/.*", ".*://.*\.theshoecompany.ca/en/ca", ".*://.*\.theshoecompany.ca/en/ca/", ".*://.*\.theshoecompany.ca/en/ca/.*"],
    designerShoeWarehouseCa: [".*://dsw.ca/en/ca", ".*://dsw.ca/en/ca/", ".*://dsw.ca/en/ca/.*", ".*://.*\.dsw.ca/en/ca", ".*://.*\.dsw.ca/en/ca/", ".*://.*\.dsw.ca/en/ca/.*"],
    shoeWarehouseCa: [".*://shoewarehouse.ca", ".*://shoewarehouse.ca/", ".*://shoewarehouse.ca/.*", ".*://.*\.shoewarehouse.ca", ".*://.*\.shoewarehouse.ca/", ".*://.*\.shoewarehouse.ca/.*"],
    costcoCa: [".*://costco.ca", ".*://costco.ca/", ".*://costco.ca/.*", ".*://.*\.costco.ca", ".*://.*\.costco.ca/", ".*://.*\.costco.ca/.*"],
    boutique1861: [".*://1861.ca", ".*://1861.ca/", ".*://1861.ca/.*", ".*://.*\.1861.ca", ".*://.*\.1861.ca/", ".*://.*\.1861.ca/.*"],
    cleo: [".*://cleo.ca", ".*://cleo.ca/", ".*://cleo.ca/.*", ".*://.*\.cleo.ca", ".*://.*\.cleo.ca/", ".*://.*\.cleo.ca/.*"],
    rickis: [".*://rickis.com", ".*://rickis.com/", ".*://rickis.com/.*", ".*://.*\.rickis.com", ".*://.*\.rickis.com/", ".*://.*\.rickis.com/.*"],
    holtRenfrew: [".*://holtrenfrew.com", ".*://holtrenfrew.com/", ".*://holtrenfrew.com/.*", ".*://.*\.holtrenfrew.com", ".*://.*\.holtrenfrew.com/", ".*://.*\.holtrenfrew.com/.*"],
    kotn: [".*://kotn.com", ".*://kotn.com/", ".*://kotn.com/.*", ".*://.*\.kotn.com", ".*://.*\.kotn.com/", ".*://.*\.kotn.com/.*"],
    laCanadienne: [".*://lacanadienneshoes.com/ca_en", ".*://lacanadienneshoes.com/ca_en/", ".*://lacanadienneshoes.com/ca_en/.*", ".*://.*\.lacanadienneshoes.com/ca_en", ".*://.*\.lacanadienneshoes.com/ca_en/", ".*://.*\.lacanadienneshoes.com/ca_en/.*"],
    loleCa: [".*://ca-en.lolelife.com", ".*://ca-en.lolelife.com/", ".*://ca-en.lolelife.com/.*", ".*://.*\.ca-en.lolelife.com", ".*://.*\.ca-en.lolelife.com/", ".*://.*\.ca-en.lolelife.com/.*"],
    rwCo: [".*://rw-co.com/en", ".*://rw-co.com/en/", ".*://rw-co.com/en/.*", ".*://.*\.rw-co.com/en", ".*://.*\.rw-co.com/en/", ".*://.*\.rw-co.com/en/.*"],
    mattAndNatCa: [".*://mattandnat.com/en_ca", ".*://mattandnat.com/en_ca/", ".*://mattandnat.com/en_ca/.*", ".*://.*\.mattandnat.com/en_ca", ".*://.*\.mattandnat.com/en_ca/", ".*://.*\.mattandnat.com/en_ca/.*"],
    laura: [".*://laura.ca/en", ".*://laura.ca/en/", ".*://laura.ca/en/.*", ".*://.*\.laura.ca/en", ".*://.*\.laura.ca/en/", ".*://.*\.laura.ca/en/.*"],
    melanieLyne: [".*://melanielyne.com/en", ".*://melanielyne.com/en/", ".*://melanielyne.com/en/.*", ".*://.*\.melanielyne.com/en", ".*://.*\.melanielyne.com/en/", ".*://.*\.melanielyne.com/en/.*"],
    dress911: [".*://dress911.com", ".*://dress911.com/", ".*://dress911.com/.*", ".*://.*\.dress911.com", ".*://.*\.dress911.com/", ".*://.*\.dress911.com/.*"],
    tobiCa: [".*://tobi.com/ca", ".*://tobi.com/ca/", ".*://tobi.com/ca/.*", ".*://.*\.tobi.com/ca", ".*://.*\.tobi.com/ca/", ".*://.*\.tobi.com/ca/.*"],
    canadaComputers: [".*://canadacomputers.com", ".*://canadacomputers.com/", ".*://canadacomputers.com/.*", ".*://.*\.canadacomputers.com", ".*://.*\.canadacomputers.com/", ".*://.*\.canadacomputers.com/.*"],
    visions: [".*://visions.ca", ".*://visions.ca/", ".*://visions.ca/.*", ".*://.*\.visions.ca", ".*://.*\.visions.ca/", ".*://.*\.visions.ca/.*"],
    toysRUs: [".*://toysrus.ca/en", ".*://toysrus.ca/en/", ".*://toysrus.ca/en/.*", ".*://.*\.toysrus.ca/en", ".*://.*\.toysrus.ca/en/", ".*://.*\.toysrus.ca/en/.*"],
    memoryExpress: [".*://memoryexpress.com", ".*://memoryexpress.com/", ".*://memoryexpress.com/.*", ".*://.*\.memoryexpress.com", ".*://.*\.memoryexpress.com/", ".*://.*\.memoryexpress.com/.*"],
    mikesComputerShop: [".*://mikescomputershop.com", ".*://mikescomputershop.com/", ".*://mikescomputershop.com/.*", ".*://.*\.mikescomputershop.com", ".*://.*\.mikescomputershop.com/", ".*://.*\.mikescomputershop.com/.*"],
    newegg: [".*://newegg.ca", ".*://newegg.ca/", ".*://newegg.ca/.*", ".*://.*\.newegg.ca", ".*://.*\.newegg.ca/", ".*://.*\.newegg.ca/.*"],
    pcCanada: [".*://pc-canada.com", ".*://pc-canada.com/", ".*://pc-canada.com/.*", ".*://.*\.pc-canada.com", ".*://.*\.pc-canada.com/", ".*://.*\.pc-canada.com/.*"],
    vuugo: [".*://vuugo.com", ".*://vuugo.com/", ".*://vuugo.com/.*", ".*://.*\.vuugo.com", ".*://.*\.vuugo.com/", ".*://.*\.vuugo.com/.*"],
  }

  if (merchant === "all") {
    for (let property in urls) {
      for (let i = 0; i < urls[property].length; i++) {
        if (url.match(urls[property][i])) {
          return true;
        }
      }
    }
    return false;
  } else {
    if (merchant in urls) {
      for (let i = 0; i < urls[merchant].length; i++) {
        if (url.match(urls[merchant][i])) {
          return true;
        }
      }
    }
    return false;
  }
}

class HelperFunctions {  

  stringCurrencyToFloat(amount) {
    if (amount) {
      return parseFloat(amount) + .05;
    }
    return 0;
  }

  plugged_isProductUrl(merchant, url) {
    return window.plugged_isProductUrl(merchant, url);
  }

  plugged_isMerchantUrl(merchant, url) {
    return window.plugged_isMerchantUrl(merchant, url);
  }

  timeSince(previous) {
    previous = Date.parse(previous);

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var current = new Date().getTime();
    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.floor(elapsed/1000) + 's';
    } else if (elapsed < msPerHour) {
      return Math.floor(elapsed/msPerMinute) + 'm';
    } else if (elapsed < msPerDay ) {
      return Math.floor(elapsed/msPerHour ) + 'h';
    } else if (elapsed < msPerMonth) {
      return Math.floor(elapsed/msPerDay) + 'd';
    } else if (elapsed < msPerYear) {
      if (Math.floor(elapsed/msPerMonth) === 1) {
        return Math.floor(elapsed/msPerMonth) + ' month';
      } else {
        return Math.floor(elapsed/msPerMonth) + ' months';
      }
    } else {
      return Math.floor(elapsed/msPerYear ) + 'y';
    }
  }

  expandedTimeSince(previous) {
    previous = Date.parse(previous);

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var current = new Date().getTime();
    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.floor(elapsed/1000) === 1 ? '1 second ago' : Math.floor(elapsed/1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.floor(elapsed/msPerMinute) === 1 ? '1 minute ago' : Math.floor(elapsed/msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
      return Math.floor(elapsed/msPerHour) === 1 ? '1 hour ago' : Math.floor(elapsed/msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.floor(elapsed/msPerDay) === 1 ? '1 day ago' : Math.floor(elapsed/msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.floor(elapsed/msPerMonth) === 1 ? '1 month ago' : Math.floor(elapsed/msPerMonth) + ' months ago';
    } else {
      return Math.floor(elapsed/msPerYear) === 1 ? '1 year ago' : Math.floor(elapsed/msPerYear) + 'years ago';
    }
  }
}

const helperFunctions = new HelperFunctions();
export default helperFunctions;