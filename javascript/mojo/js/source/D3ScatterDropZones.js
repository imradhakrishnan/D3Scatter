(function () { 
    if (!mstrmojo.plugins.D3Scatter) {
        mstrmojo.plugins.D3Scatter = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.vi.models.CustomVisDropZones",
        "mstrmojo.array"
    );

    mstrmojo.plugins.D3Scatter.D3ScatterDropZones = mstrmojo.declare(
        mstrmojo.vi.models.CustomVisDropZones,
        null,
        {
            scriptClass: "mstrmojo.plugins.D3Scatter.D3ScatterDropZones",
            cssClass: "d3scatterdropzones",
            getCustomDropZones: function getCustomDropZones(){
                var ENUM_ALLOW_DROP_TYPE = mstrmojo.vi.models.CustomVisDropZones.ENUM_ALLOW_DROP_TYPE;

                return [
                    {
                        name: 'Horizontal Axis Metric',
                        title: mstrmojo.desc(13827, 'Drag metric here'),
                        maxCapacity: 1,
                        allowObjectType: ENUM_ALLOW_DROP_TYPE.METRIC
                    },
                    {
                        name: 'Vertical Axis Metric',
                        title: mstrmojo.desc(13827, 'Drag metric here'),
                        maxCapacity: 1,
                        allowObjectType: ENUM_ALLOW_DROP_TYPE.METRIC
                    },
                    {
                        name: 'Group By',
                        title: mstrmojo.desc(13827, 'Drag attribute here'),
                        minCapacity: 1,
                        maxCapacity: 4,
                        allowObjectType: ENUM_ALLOW_DROP_TYPE.ATTRIBUTE
                    },
                    {
                        name: 'Animate By',
                        title: mstrmojo.desc(13827, 'Drag attribute here'),
                        maxCapacity: 1,
                        allowObjectType: ENUM_ALLOW_DROP_TYPE.ATTRIBUTE
                    },
                    {
                        name: 'Animate Bar Size By',
                        title: mstrmojo.desc(13827, 'Drag metric here'),
                        maxCapacity: 1,
                        allowObjectType: ENUM_ALLOW_DROP_TYPE.METRIC
                    },
                    {
                        name: 'Animate Bar Order By',
                        title: mstrmojo.desc(13827, 'Drag attribute here'),
                        maxCapacity: 1,
                        allowObjectType: ENUM_ALLOW_DROP_TYPE.ATTRIBUTE
                    }

                ];
 },
            shouldAllowObjectsInDropZone: function shouldAllowObjectsInDropZone(zone, dragObjects, idx, edge, context) {









},
            getActionsForObjectsDropped: function getActionsForObjectsDropped(zone, droppedObjects, idx, replaceObject, extras) {
 








},
            getActionsForObjectsRemoved: function getActionsForObjectsRemoved(zone, objects) { 
 








},
            getDropZoneContextMenuItems: function getDropZoneContextMenuItems(cfg, zone, object, el) {
 








}
})}());
//@ sourceURL=D3ScatterDropZones.js