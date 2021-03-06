/*
@	Author : Raz
@
@	NPC = Red Balloon
@	Map = Hidden-Street <Stage 1>
@	NPC MapId = 922010100
@	Function = LPQ - 1st Stage
@
*/

var status = 0;
var party;
var preamble;
var gaveItems;

function start() {
	status = -1;
	action(1, 0, 0);
}

function clear(stage, eim, cm) {
    eim.setProperty(stage + "stageclear", "true");
    var map = eim.getMapInstance(cm.getChar().getMapId());
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
    var mf = eim.getMapFactory();
    map = mf.getMap(103000800 + stage);
    var nextStage = eim.getMapInstance(103000800 + stage);
    //var portal = nextStage.getPortal("next00");
    //if (portal != null) {
      //  portal.setScriptName("kpq" + stage);
    }

function action(mode, type, selection) {

         
         if (mode == -1) {
		cm.dispose();//ExitChat
	}else if (mode == 0){
		cm.dispose();//No
	}else{		    //Regular Talk
		if (mode == 1)
			status++;
		else
			status--;
		var eim = cm.getChar().getEventInstance(); 
		var nthtext = "1st";


                 if (status == 0) {
		 party = eim.getPlayers();
                 preamble = eim.getProperty("leader" + nthtext + "preamble");
		 gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
                        if (preamble == null) {
                                cm.sendNext("Hi. Welcome to the " + nthtext + " stage.");
                                eim.setProperty("leader" + nthtext + "preamble","done");
                                cm.dispose();
                        }else{
		 if(!isLeader()){
		 if(gaveItems == null){
		 cm.sendOk("Please tell your #bParty-Leader#k to come talk to me");
		 cm.dispose();
		 }else{
		  cm.sendOk("Hurry, goto the next stage, the portal is open!");
		  cm.dispose();
		 }
		}else{
		if(gaveItems == null){
		if(cm.itemQuantity(4001022) >= 25){
		cm.sendOk("Good job! You have collected all 25 #b#t4001022#'s#k\r\nYou may continrue to the next stage!");
		//clear(1, eim, cm);
                cm.givePartyExp(10000, party);
                cm.loseItem(4001022, 25);
		}else{
		cm.sendOk("Sorry you don't have all 25 #b#t4001022#'s#k");
		cm.dispose();
		}
		}else{
		cm.sendOk("Hurry, goto the next stage, the portal is open!");
		cm.dispose();
		}
		}}
		}else if (status == 1){
		cm.warpParty(922010300);
		
                eim.setProperty("1stageclear","true");
		eim.setProperty("leader" + nthtext + "gaveItems","done");
		cm.dispose();
		}else if (status == 2){
                    cm.warpParty(922010300);
                }
          }
     }

     
function isLeader(){
if(cm.getParty() == null){
return false;
}else{
return cm.isLeader();
}
}


