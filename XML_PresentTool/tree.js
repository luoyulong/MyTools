//����XMLdom���󣬲�����xml��xmlFilePathΪxml���ı�·��
function CreateXMLDoc(xmlFilePath)
{	alert("1");
	if(window.ActiveXObject) 
	{ 
		//��ò�����xml�ļ��Ķ��� 
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
       xmlDom.load(xmlFile)||xmlDom.loadXML(xmlFile);//����õ���XML�ַ���//����õ���xml�ļ�    
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

//�������νṹ��HTML���룬����nodeΪ�ڵ���,levelΪ��ǰ�ڵ�����ڸ��ڵ�����ֵ
function BuilderTree(nodeName,level)
{

	//�Ӳ˵��������������
	var indent=60;
	var temp="";
	
	level=level==null ? 0 : level;
	var nodes=nodeName.childNodes
	
	for(var i=0;i<nodes.length;i++)
	{
	
		//���ýڵ�û�¼��ڵ�ʱ
		if(nodes[i].childNodes.length<1)
		{
		/*//��ǰ�˵�������
		temp+="<div style='margin-left:"+level*indent+"px;cursor:hand;''>";
		temp+="<b>-</b> ";
		//�Ƿ���´���
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

//����ĳ���ڵ����һ�ڵ�nextSibling�Ƿ���ʾ��
function show(obj)
{


	//��ǰ�ڵ����һ�ڵ�
	var nextNode=obj.nextSibling;
	//��ǰ�ڵ��ͷ�����Žڵ㣬���ǲ˵���ǰ��+��-��
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