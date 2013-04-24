//建立XMLdom对象，并载入xml，xmlFilePath为xml的文本路径
function CreateXMLDoc(xmlFilePath)
{	alert("1");
	if(window.ActiveXObject) 
	{ 
		//获得操作的xml文件的对象 
		var msXMLdom = new ActiveXObject('Microsoft.XMLDOM'); 
		msXMLdom.async = false; 
		msXMLdom.load(xmlFilePath); 
		return msXMLdom;
	}
	else
	{	 
		var oXmlHttp = new XMLHttpRequest() ;
		oXmlHttp.open( "GET", xmlFilePath, false ) ;
		oXmlHttp.send(null) ;
		
		return oXmlHttp.responseXML;
	
	} 
}
 function loadXmlFile(xmlFile){    
      var xmlDom = null;   
      if (window.ActiveXObject){    
        xmlDom = new ActiveXObject("Microsoft.XMLDOM");    
        xmlDom.async=false;    
       xmlDom.load(xmlFile)||xmlDom.loadXML(xmlFile);//如果用的是XML字符串//如果用的是xml文件    
      }else if (document.implementation && document.implementation.createDocument){   
        var xmlhttp = new window.XMLHttpRequest();    
        xmlhttp.open("GET", xmlFile, false); 
 
      xmlhttp.send(null);   
 			 
        xmlDom = xmlhttp.responseXML;    
      }else{     
        xmlDom = null;    
      }    
      return xmlDom;    
    } 
var xmlDoc; 
//xmlDoc=CreateXMLDoc("ast.xml");
xmlDoc=loadXmlFile("../ast.xml");

var rootNode=xmlDoc.lastChild;

//返回树形结构的HTML代码，参数node为节点名,level为当前节点相对于根节点的深度值
function BuilderTree(nodeName,level)
{

	//子菜单项，缩进的像素数
	var indent=60;
	var temp="";
	
	level=level==null ? 0 : level;
	var nodes=nodeName.childNodes
	
	for(var i=0;i<nodes.length;i++)
	{
	
		//当该节点没下级节点时
		if(nodes[i].childNodes.length<1)
		{
		/*//当前菜单的名称
		temp+="<div style='margin-left:"+level*indent+"px;cursor:hand;''>";
		temp+="<b>-</b> ";
		//是否打开新窗口
		var target=nodes[i].getAttribute("target")==null ? "" : "target='"+nodes[i].getAttribute("target")+"'";
		temp+="<a href='"+nodes[i].getAttribute("url")+"' "+target+">"+nodes[i].getAttribute("Type")+"</a>";
		temp+="</div>";
		*/	
		temp+="<div class='nodea' Style='background-color:#ADFF2F;'>";
			
			temp+="["+nodes[i].getAttribute("Type")+"]";
			temp+="='"+nodes[i].getAttribute("Msg")+"'";
			
		temp+="</div>";
		continue;
		}	

		
		temp+="<div class='nodea' Style='cursor:hand;' "+">";
				
			temp+="<div class='nodeb'  title='"+nodes[i].getAttribute("Code")+"' onclick='show(this)'>";
				temp+=nodes[i].getAttribute("Type")+level;
				temp+="='"+nodes[i].getAttribute("Msg")+"'";
			temp+="</div>";
			
			temp+="<div class='nodeb' Style=' ' >"
				temp+=BuilderTree(nodes[i],level+1);
			temp+="</div>"
		temp+="</div>"
		
	
	}
	
	return temp;
}

//操作某个节点的下一节点nextSibling是否显示；
function show(obj)
{


	//当前节点的下一节点
	var nextNode=obj.nextSibling;
	//当前节点的头部符号节点，就是菜单项前面+、-号
	var subNode=obj.firstChild.firstChild;
	if(nextNode.nodeType==1)
	{
		with(eval(nextNode))
		{
			 if(style.visibility=="inherit")
			 {
			  style.visibility="Hidden";
			  //subNode.nodeValue="+";
			 }else
			 {
			  style.visibility="inherit";
			  //subNode.nodeValue="-";
			 }
 
		}
	}
}