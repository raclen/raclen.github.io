using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using System.Windows.Forms;
using System.Drawing;
using System.Diagnostics;
using System.Threading;
namespace SmartQQ_1212
{
    class SmartQQ
    {
        //回调
        private delegate void HttpCallback(Stream sm, string cookie);
        private string StreamToString(Stream sm)
    {
            return new StreamReader(sm).ReadToEnd();
    }
    //二维码容器
    private PictureBox QRPic;
    private TextBox LogBox;
    private string cookies;
    private string ptwebqq;
    private string vfwebqq;
    private string uin;
    private string psessionid;
    public SmartQQ(PictureBox pic,TextBox log)
    {
        Control.CheckForIllegalCrossThreadCalls = false;
        QRPic = pic;
        LogBox = log;
        cookies = "";

    }

    private void Http(string url, string referer, HttpCallback callback,string postdata="",string host="")
    {
        HttpWebRequest req = WebRequest.Create(url) as HttpWebRequest;
        req.ContentType = "application/x-www-form-urlencoded";
        if (host != "")
        {
            req.Host =host;
        }

        //not 300+
        req.AllowAutoRedirect = false;

        //Chrome
        req.UserAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.7 Safari/537.36";

        //Cookie
        req.Headers.Add("Cookie", cookies);

        //referer
        req.Referer = referer;

        //async
        if (postdata == "")
        {

            //Get
            req.Method = "GET";
        }
        else
        {
            //Post
            req.Method = "POST";
            byte[] data = Encoding.ASCII.GetBytes(postdata);
            Stream rs = req.GetRequestStream();
            rs.Write(data, 0, data.Length);
            rs.Close();

        }
        req.BeginGetResponse((IAsyncResult ar) =>
        {
            //
            HttpWebResponse res = (ar.AsyncState as HttpWebRequest).EndGetResponse(ar) as HttpWebResponse;
            //result
            Stream sm = res.GetResponseStream();

            callback(sm, res.Headers["Set-Cookie"]);
            //

            req.Abort();
        }, req);



    }

    //Cookie 
    private string GetCookieValue(string key)
    {
        int pt = cookies.IndexOf(key);
        if (pt == -1)
        {
            return "";
        }
        else
        {
            pt += key.Length + 1;
            return cookies.Substring(pt, cookies.IndexOf(';', pt) - pt);
        }
    }
    private string GetCookies(string cookies)
    {
        string[] temp = cookies.Split(',');
        string result = "";
        foreach (string s in temp)
        {
            string[] temp1 = s.Split(';');
            foreach (string s1 in temp1)
            {
                if (s1.IndexOf("PATH=") == -1 && s1.IndexOf("DOMAIN=") == -1 && s1.IndexOf("EXPIRES=") == -1 && s1 != "")
                {
                    if (s1.IndexOf("=") != -1 && s1.IndexOf("=")!=s1.Length-1)
                    {
                        result += s1 + ";";
                    }
                }
            }
        }
        return result;
    }
    //1、QR
    public void QRCode()
    {
        Http("https://ssl.ptlogin2.qq.com/ptqrshow?appid=501004106&e=0&l=M&s=5&d=72&v=4&t=0.22925435146316886",
            "https://ui.ptlogin2.qq.com/cgi-bin/login",
            (Stream sm, string ck) =>
        {
            QRPic.Image = Image.FromStream(sm);
            cookies += GetCookies(ck);
            Login0();
        });
    }
    //循环Login0
    private void Login0()
    {
        Http("https://ssl.ptlogin2.qq.com/ptqrlogin?webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=0-0-136435&mibao_css=m_webqq&t=undefined&g=1&js_type=0&js_ver=10139&login_sig=&pt_randsalt=0",
            "https://ui.ptlogin2.qq.com/cgi-bin/login",
            (Stream sm, string ck) =>
        {

            string temp = StreamToString(sm);
            LogBox.Text = temp;
            if (temp.IndexOf("成功") != -1)
            {
                Debug.Print(temp);
                string url = temp.Split(',')[2];
                url = url.Substring(1, url.Length - 2);
                cookies += GetCookies(ck);
                Login1(url);
            }
            else if (temp.IndexOf("已失效") != -1)
            {
                cookies = "";
                QRCode();
            }
            else
            {
                Thread.Sleep(1000);
                Login0();
            }
        });
    }
    //成功Login1
    private void Login1(string url)
    {
        Http(url,
            "https://ui.ptlogin2.qq.com/cgi-bin/login",
            (Stream sm, string ck) =>
        {
            string temp = StreamToString(sm);
            LogBox.Text = temp;
            cookies += GetCookies(ck);
            ptwebqq = GetCookieValue("ptwebqq");
            Login2();
        });
    }
    //成功Login2
    private void Login2()
    {
        Http("http://s.web2.qq.com/api/getvfwebqq?ptwebqq="+ptwebqq+"&clientid=53999199&psessionid=&t=1446710396202",
            "http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1",
            (Stream sm, string ck) =>
        {
            string temp = StreamToString(sm);
            LogBox.Text = temp;
            vfwebqq= temp.Split('"')[7];
            //记录vfwebqq
            Login3();
        }
    );
    }
    //成功Login3
    private void Login3()
    {
        Http("http://d.web2.qq.com/channel/login2",
            "http://d.web2.qq.com/proxy.html?v=20130916001&callback=1&id=2", (Stream sm, string ck) =>
        {
            string temp = StreamToString(sm);
            LogBox.Text = temp;
            uin = temp.Split(',')[6].Split(':')[1];
            psessionid = temp.Split(',')[4].Split(':')[1];
            psessionid = psessionid.Substring(1, psessionid.Length - 2);
            Debug.Print(temp);
            GetFriends();
        }, "r=%7B%22ptwebqq%22%3A%22" + ptwebqq.Substring(8) + "%22%2C%22clientid%22%3A53999199%2C%22psessionid%22%3A%22%22%2C%22status%22%3A%22online%22%7D",
        "d1.web2.qq.com");
        //
    }
}

}
s