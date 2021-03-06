﻿
var map = null, govtTooltip, clusterTooltip, clusterInfobox, clusterLayer, govtLayer;

var mapWidth = 700;
var mapHeight = 500;
var govtLocations = [],
    maxValue = 50;
var clat = new Array(27);
var clon = new Array(27);
var sname = ['القطاع الصناعي', 'قطاع الانتاج الحيواني', 'القطاع الخدمي', 'القطاع التجاري', 'قطاع مهن حرة', 'حرف يدوية'];

var mapclat, mapclon;
var num = 0;
var zoomLevel;
var govtpin = new Array(27);
var clusterpin = new Array(500);

var lastZoomLevel;

var clusterData;
var govtData;
var clickedGovtID=0;

var Zoom = {
    MAX: 10,
    MIN: 4
}

function GetMap(myArray) {
    // Initialize the map
    //default zoom scales in km/pixel from http://msdn2.microsoft.com/en-us/library/aa940990.aspx


    clusterData = myArray.ClusterData;
    num = clusterData.length;

    govtData = myArray.GovtData;



    computeMapCenterZoom(0);

    //mapcLat = 30.1;
    //mapcLon = 31.26;
    //zoomLevel = 7;

    try {
       

        map = new Microsoft.Maps.Map(document.getElementById('myMap'),
               {
                   //credentials: 'ApsJjM2R2v3U-bnatAF3H0IY4cbas9KnKtIwKzOsLVICG3kqmJaDUZEh_8J-RzR7',
                   center: new Microsoft.Maps.Location(mapclat, mapclon),
                   mapTypeId: Microsoft.Maps.MapTypeId.road,
                   zoom: zoomLevel,
                   //customizeOverlays: true
                   
               });
    }

    
    catch (e) {
        alert("الخريطة غير متاحة الان - حاول لاحقا");
    }

    

    if (num == 0 && map != null) {
        map.setView({ center: new Microsoft.Maps.Location(30.1, 31.26), zoom: 7 });
    }

    if ( num>0 && map != null) {

        
        lastZoomLevel = map.getZoom();

        /*
        govtLayer = new Microsoft.Maps.EntityCollection();
        map.entities.push(govtLayer);
        */

        govtLayer = new Microsoft.Maps.Layer();
        map.layers.insert(govtLayer);

        /*
        var govtTooltipLayer = new Microsoft.Maps.EntityCollection();
        map.entities.push(govtTooltipLayer);

        govtTooltip = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, width: 210, height: 160, offset: new Microsoft.Maps.Point(-120, 35) });

        govtTooltipLayer.push(govtTooltip);
        */

        govtTooltip = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, width: 210, height: 160, offset: new Microsoft.Maps.Point(-120, 35) });
        govtTooltip.setMap(map);

        AddGovtLocations();

        /*
        clusterLayer = new Microsoft.Maps.EntityCollection();
        map.entities.push(clusterLayer);
        */

        clusterLayer = new Microsoft.Maps.Layer();
        map.layers.insert(clusterLayer);

        /*
        var clusterInfoBoxLayer = new Microsoft.Maps.EntityCollection();
        map.entities.push(clusterInfoBoxLayer);

        clusterTooltip = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, width: 200, height: 150, offset: new Microsoft.Maps.Point(-100, 35) });
        clusterInfoBoxLayer.push(clusterTooltip);
        */
        clusterTooltip = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, width: 200, height: 150, offset: new Microsoft.Maps.Point(-100, 35) });
        clusterTooltip.setMap(map);

        //clusterInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, width: 200, offset: new Microsoft.Maps.Point(-100, 15) });
        //clusterInfoBoxLayer.push(clusterInfobox);

        CreateGovtLayer();

        createClusterLayer(0);

        Microsoft.Maps.Events.addHandler(map, 'viewchangeend', viewChanged);

        if (zoomLevel > 8) {

            showClusterLayer();

        }
        else {

            showGovtLayer();

        }
    }
        
    
    }

function showGovtLayer() {
    for (i = 0; i < 27; i++) {
        if (govtData[i].Cluster_Num != 0) {
            govtpin[i].setOptions({ visible: true });
        }
    }
    
    for (i = 0; i < num; i++) {   //num
        clusterpin[i].setOptions({ visible: false });
        // clusterInfobox.setOptions({ visible: false });
        clusterTooltip.setOptions({ visible: false });
    }
    map.layers[0].setVisible(true);
    
    map.layers[1].setVisible(false);
    
}

function showClusterLayer() {
    for (i = 0; i < 27; i++) {
        if (govtData[i].Cluster_Num != 0) {
            govtpin[i].setOptions({ visible: false });
            govtTooltip.setOptions({ visible: false });
        }
    }

    for (i = 0; i < num; i++) {
        if (clusterData[i].Govt_ID == clickedGovtID || clickedGovtID == 0) {
            clusterpin[i].setOptions({ visible: true });
        }
        else {

            clusterpin[i].setOptions({ visible: false });
        }

        //clusterpin[i].setOptions({ visible: true });
    }

    map.layers[0].setVisible(false);

    map.layers[1].setVisible(true);

}

function viewChanged(e) {
    //var currentZoomLevel = map.getZoom();
    var targetZoom = map.getZoom();
    
    if (targetZoom > 8)
        showClusterLayer();
    else
        showGovtLayer();



}

function computeMapCenterZoom(govtID) {

    var defaultScales = [78.27152, 39.13576, 19.56788, 9.78394, 4.89197, 2.44598, 1.22299,
0.61150, 0.30575, 0.15287, .07644, 0.03822, 0.01911, 0.00955, 0.00478, 0.00239, 0.00119, 0.0006, 0.0003];



    mapclat = 0;
    mapclon = 0;
    var maxLat = -90;
    var minLat = 90;
    var maxLon = -180;
    var minLon = 180;
    var n = 0;

    for (var i = 0; i < num; i++) {

        if (clusterData[i].Govt_ID == govtID || govtID == 0) {
            n++;
            mapclat = mapclat + clusterData[i].Cluster_Lat;
            mapclon = mapclon + clusterData[i].Cluster_Long;



            if (clusterData[i].Cluster_Lat > maxLat)
                maxLat = clusterData[i].Cluster_Lat;
            if (clusterData[i].Cluster_Lat < minLat)
                minLat = clusterData[i].Cluster_Lat;

            if (clusterData[i].Cluster_Long > maxLon)
                maxLon = clusterData[i].Cluster_Long;
            if (clusterData[i].Cluster_Long < minLon)
                minLon = clusterData[i].Cluster_Long;

        }

    }

    //calculate center coordinate of bounding box
    mapclat = (maxLat + minLat) / 2;
    mapclon = (maxLon + minLon) / 2;

    //want to calculate the distance in km along the center latitude between the two longitudes
    var meanDistanceX = HaversineDistance(mapclat, minLon, mapclat, maxLon);

    //want to calculate the distance in km along the center longitude between the two latitudes
    var meanDistanceY = HaversineDistance(maxLat, mapclon, minLat, mapclon); // * 2

    //calculates the x and y scales
    var meanScaleValueX = meanDistanceX / (mapWidth - 50);
    var meanScaleValueY = meanDistanceY / (mapHeight - 50);

    var meanScale;

    //gets the largest scale value to work with
    if (meanScaleValueX > meanScaleValueY)
        meanScale = meanScaleValueX;
    else
        meanScale = meanScaleValueY;

    //intialize zoom level variable
    zoomLevel = 1;

    //calculate zoom level
    for (var i = 1; i < 19; i++) {
        if (meanScale >= defaultScales[i]) {
            zoomLevel = i;
            break;
        }
    }


    if (n == 0) {

        mapcLat = 30.1;
        mapcLon = 31.26;
        zoomLevel = 8;
    }

    if (n == 1) {

        zoomLevel = 9;
    }

}

function AddGovtLocations() {

    for (var i = 0; i < 27; i++) {
        if (govtData[i].Cluster_Num != 0)
            govtLocations.push(new Microsoft.Maps.Location(govtData[i].Govt_Lat, govtData[i].Govt_Long));
        else
            govtLocations.push(new Microsoft.Maps.Location(0,0));
    }

}

function CreateGovtLayer() {


    var pushpinOptions;

    for (i = 0; i < 27; i++) {
        if (govtData[i].Cluster_Num != 0) {
            var pintxt = String(i + 1);
            var divID = "govt" + pintxt;
            //pushpinOptions = { visible: false, text: 'govt' + pintxt, visible: true, icon: "/Images/blueflag.png", width: 40, height: 40 };
            pushpinOptions = { visible: false, catId: govtData[i].Govt_ID, visible: true, icon: "/Images/blueflag.png", width: 40, height: 40 };
            govtpin[i] = new Microsoft.Maps.Pushpin(govtLocations[i], pushpinOptions);

            govtpin[i].Title = " محافظة " + govtData[i].Govt_Name;

            govtpin[i].Description = " عدد التجمعات " + ":&nbsp" + govtData[i].Cluster_Num + "<br>" + " متوسط عدد الوحدات الانتاجية " + ":&nbsp" + govtData[i].ShopNumMin + "<br>" + " متوسط عدد العاملين " + ":&nbsp" + govtData[i].EmpNumMin + "<br>" + " عدد التجمعات المصدرة " + ":&nbsp" + govtData[i].ExportNum;

            imgsection = '<img src= "/Images/' + govtData[i].Govt_ID + '.png' + '" alt="محافظة' + govtData[i].Govt_ID + '" style="width:50px; height:50px">';

            govtpin[i].htmlContent = '<div id="' + divID + '" style="background-color:White; border-style:solid;border-width:thin; border-color:blue; width:210px;  min-height:120px;">' +
            '<div id="infoboxTitle" style="text-decoration:underline; text-align:center; font-size:medium; margin-right: 1em; margin-left: 1em;">' + govtpin[i].Title + '</div> ' + imgsection +
        '<div id="infoboxDescription" style="text-decoration:none; text-align:right; margin-right: 1em; margin-left: 1em;" >' + govtpin[i].Description + '</div> </div>'


            Microsoft.Maps.Events.addHandler(govtpin[i], 'mouseover', displayGovtTooltip);
            Microsoft.Maps.Events.addHandler(govtpin[i], 'mouseout', hideGovtTooltip);

            Microsoft.Maps.Events.addHandler(govtpin[i], 'click', function (e) { createClusterLayer(e); });

            govtLayer.add(govtpin[i]);
        }

    }
}


// This function will create an govtTooltip 
// and then display it for the pin that triggered the hover-event.
function displayGovtTooltip(e) {


    if (e.targetType == 'pushpin') {
        govtTooltip.setLocation(e.target.getLocation());
        //govtTooltip.setOptions({ visible: true, title: e.target.Title, description: e.target.Description });
        govtTooltip.setOptions({ visible: true, htmlContent: e.target.htmlContent });
    }
 
}


function hideGovtTooltip(e) {
    if (govtTooltip != null)
        govtTooltip.setOptions({ visible: false });

 
}



function createClusterLayer(e) {


    var pushpinOptions;

    var refSection = "";
    var imgSection = "";
    var linkSection = "";

    if (e.targetType == 'pushpin') {
        //govtID = e.target.Title().match(/\d+$/)[0];
        govtID = e.target.catId;

        clickedGovtID = govtID;

        for (i = 0; i < 27; i++) {
            if (govtData[i].Cluster_Num != 0) {
                govtpin[i].setOptions({ visible: false });
                govtTooltip.setOptions({ visible: false });
            }
        }

    }
    else
        govtID = 0;

    computeMapCenterZoom(govtID);

    map.setView({ center: new Microsoft.Maps.Location(mapclat, mapclon), zoom: zoomLevel });

    for (i = 0; i < num; i++) {


        if (clusterData[i].Govt_ID == govtID || govtID == 0) {

            
            var pintxt = String(i + 1);

            switch (clusterData[i].Sector_ID) {

                case 1: pushpinOptions = { text: pintxt,  icon: "/Images/RedPushPin.png", visible: false };
                    break;
                case 2: pushpinOptions = { text: pintxt,  icon: "/Images/GreenPushPin.png", visible: false };
                    break;
                case 3: pushpinOptions = { text: pintxt,  icon: "/Images/LightBluePushPin.png", visible: false };
                    break;
                case 4: pushpinOptions = { text: pintxt,  icon: "/Images/BlackPushPin.png", visible: false };
                    break;
                case 5: pushpinOptions = { text: pintxt,  icon: "/Images/YellowPushPin.png", visible: false };
                    break;
                case 6: pushpinOptions = { text: pintxt,  icon: "/Images/GreenPushPin.png", visible: false };
                    break;
                default: pushpinOptions = { text: pintxt,  icon: "/Images/TransparentPushPin.png", visible: false };
                    break;
            }

            var location1 = new Microsoft.Maps.Location(clusterData[i].Cluster_Lat, clusterData[i].Cluster_Long);
            clusterpin[i] = new Microsoft.Maps.Pushpin(location1, pushpinOptions);
            clusterpin[i].Title = pintxt + '-' + clusterData[i].Cluster_Name;

            clusterpin[i].Description = clusterData[i].Cluster_Info1 + "<br>" + clusterData[i].Cluster_Info2 + "<br>" + clusterData[i].Cluster_Info3 + "<br>" + clusterData[i].Cluster_Info5;
            clusterpin[i].showCloseButton = true;



            if (clusterData[i].Cluster_ProductImage != null && clusterData[i].Cluster_ProductImage != "") {
                imgSection = '<img src= "../' + clusterData[i].Cluster_ProductImage + '" alt="Product Image" style="width:100px; height:100px">';
            }
            else {
                imgSection = '';
            }
            var divID = "infoboxText" + clusterData[i].Cluster_Num;

            //  clusterpin[i].htmlContent = '<div id="' + divID + '" style="direction: rtl; background-color:White; border-style:solid;border-width:medium; border-color:DarkOrange; position:relative; top:-12px; left:-50px; min-height:105px;width:105px; ">' +'</a>' + imgSection + '</div> ';
            // clusterpin[i].htmlContent = imgSection;

            //clusterpin[i].htmlContent = '<div id="' + divID + '" style="direction: rtl; background-color:White; border-style:solid;border-width:medium; border-color:blue; position:relative; top:0px; left:0px; min-height:25px;width:105px; ">' + '<center> <b id="infoboxTitle' + i +
            //'" style="text-decoration:none; position:absolute; top:0px; right:2px; width:100px;">' + clusterData[i].Cluster_Name + ' </center> </div> ';

            clusterpin[i].htmlContent = '<div id="' + divID + '" style="background-color:White; border-style:solid;border-width:thin;  width:200px; min-height:120px; border-color:blue; ">' +
            '<div id="infoboxTitle1" style="text-decoration:underline;position:center; text-align:center; font-size:medium; margin-right: 1em; margin-left: 1em">' + clusterData[i].Cluster_Name + '</div>' +
            '<div id="infoboxDescription1" style="text-decoration:none;position:center;  text-align:right; margin-right: 1em; margin-left: 1em" >' + clusterpin[i].Description + '</div> </div>'

            // Add handler for the pushpin click event.
            Microsoft.Maps.Events.addHandler(clusterpin[i], 'click', displayInfobox);

            Microsoft.Maps.Events.addHandler(clusterpin[i], 'mouseover', displayClusterTooltip);
            Microsoft.Maps.Events.addHandler(clusterpin[i], 'mouseout', hideClusterTooltip);


            clusterLayer.add(clusterpin[i]);
           


        }




    }
}



/// <summary>
/// Calculate the distance in kilometers between two coordinates
/// </summary>
/// <param name="lat1"></param>
/// <param name="lon1"></param>
/// <param name="lat2"></param>
/// <param name="lon2"></param>
/// <returns></returns>
function HaversineDistance(lat1, lon1, lat2, lon2) {
    var earthRadius = 6371;
    var factor = Math.PI / 180;
    var dLat = (lat2 - lat1) * factor;
    var dLon = (lon2 - lon1) * factor;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * factor) * Math.cos(lat2 * factor)
* Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
}
    

function AddData(myArray) {

    var pin = [300];
    var pushpinOptions;
    var num = clusterData.length;
    var refSection = "";
    var imgSection = "";
    var linkSection = "";


    for (i = 0; i < num; i++) {

        var pintxt = String(i + 1);

        switch (clusterData[i].Sector_ID) {

            case 1: pushpinOptions = { title: 'pin' + pintxt, text: pintxt, icon: "/Images/RedPushPin.png", visible: false };
                break;
            case 2: pushpinOptions = { title: 'pin' + pintxt, text: pintxt, icon: "/Images/GreenPushPin.png", visible: false };
                break;
            case 3: pushpinOptions = { title: 'pin' + pintxt, text: pintxt, icon: "/Images/LightBluePushPin.png", visible: false };
                break;
            case 4: pushpinOptions = { title: 'pin' + pintxt, text: pintxt, icon: "/Images/BlackPushPin.png", visible: false };
                break;
            case 5: pushpinOptions = { title: 'pin' + pintxt, text: pintxt, icon: "/Images/YellowPushPin.png", visible: false };
                break;
            default: pushpinOptions = { title: 'pin' + pintxt, text: pintxt, icon: "/Images/TransparentPushPin.png", visible: false };
                break;
        }

        var location1 = new Microsoft.Maps.Location(clusterData[i].Cluster_Lat, clusterData[i].Cluster_Long);
        pin[i] = new Microsoft.Maps.Pushpin(location1, pushpinOptions);
        pin[i].Title = clusterData[i].Cluster_Name;

        pin[i].Description = clusterData[i].Cluster_Info1 + "<br>" + clusterData[i].Cluster_Info2;
        pin[i].showCloseButton = true;



        linkSection = '<script> $(document).ready(function () { $(\'#infoboxTitle' + i + '\').click(function () {' +
             'var dataToSend = {' +
                 'id:' + clusterData[i].Cluster_ID + '};' +
            '$.ajax({url: "/Home/ClusterDetail",' +
            'type: "POST",' +
            'dataType: \'json\',' +
            'crossDomain: true,'+
            'contentType: \'application/json; charset=utf-8\',' +
            'data: JSON.stringify(dataToSend),' +
            'success: function (results) {' +
            'ClusterDetail(results);},});});})' +
            '</script>'


        refSection1 = '';
        refSection2 = '';


        if (clusterData[i].Cluster_ProductImage != null && clusterData[i].Cluster_ProductImage != "") {
            imgSection = '<img src= "../' + clusterData[i].Cluster_ProductImage + '" alt="Product Image" style="position:absolute; top:40px; left:1px; width:40px; height:40px">';
        }
        else {
            imgSection = '';
        }
        var divID = "infoboxText" + clusterData[i].Cluster_Num;

        pin[i].htmlContent = '<div id="' + divID + '" style="direction: rtl; background-color:White; border-style:solid;border-width:medium; border-color:DarkOrange; position:relative; top:-12px; left:-100px; min-height:145px;width:200px; ">' +
            '<button class="close" style="text-decoration:none; position:absolute; top:1px; left:1px;" onclick="document.getElementById(\'' + divID + '\').style.display =\'none\'">X</button>' +
            refSection1 +
            '<b id="infoboxTitle' + i +
            '" style="text-decoration:underline; position:absolute; top:0px; right:1px; width:180px;"> ' + clusterData[i].Cluster_Num + '-' + clusterData[i].Cluster_Name + refSection2 +
            '</b> <a id="infoboxDescription' + i + '" style="text-decoration:none; color:#000000; position:relative; top:18px; right:1px; min-height:50; width:198px;">' + clusterData[i].Cluster_Info1 + "<br>" + clusterData[i].Cluster_Info2 + "<br>" + clusterData[i].Cluster_Info3 + "<br>" + clusterData[i].Cluster_Info4 + '</a>' + imgSection + '</div> ' + linkSection;


        // Add handler for the pushpin click event.
        Microsoft.Maps.Events.addHandler(pin[i], 'click', displayInfobox);



        dataLayer.add(pin[i]);


    }
}

function displayClusterTooltip(e) {
    if (e.targetType == 'pushpin') {
        clusterTooltip.setLocation(e.target.getLocation());
        //clusterInfobox.setOptions({ visible: true, title: e.target.Title });
        clusterTooltip.setOptions({ visible: true, htmlContent: e.target.htmlContent });
    }

  }

function hideClusterTooltip() {
    if (clusterTooltip != null)
        clusterTooltip.setOptions({ visible: false });

}


function displayInfobox(e) {
    if (e.targetType == 'pushpin') {
        //clusterInfobox.setLocation(e.target.getLocation());
        //clusterInfobox.setOptions({ visible: true, title: e.target.Title, description: e.target.Description });
        //clusterInfobox.setOptions({ visible: true, htmlContent: e.target.htmlContent });
        var index = parseInt(e.target.getText()) - 1;

        var url = "/Home/ClusterDetail/" + clusterData[index].Cluster_ID;
        var win = window.open(url, '_blank');



    }
}



