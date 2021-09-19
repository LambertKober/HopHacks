import icon_black from './icon-black.svg'
import React from "react";
import './footer.css';

function Footer() {
    return (
        <footer class="page-footer" style={{"font":"small", "background-color":"rgba(237,239,241,1)"}}>
            <div>
                <div class="footer py-3 " style={{'text-align': 'left'}}>
                    <a style={{'padding-left':'10px'}}>     </a>
                    <img src={(icon_black)} width="24" height="24" className="icon" />
                    <a style={{'padding-left':'14px', 'color':"rgba(34,37,41,1)"}}>  timely.ca</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
