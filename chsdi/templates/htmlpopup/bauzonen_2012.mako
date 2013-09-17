<%inherit file="base.mako"/>

<%def name="table_body(c, lang)">
    <tr><td width="150">${_('tt_bauzonen_CH_Code_HN')}</td>    <td>${c['attributes']['ch_code_hn'] or '-'}</td></tr>
    <tr><td width="150">${_('tt_bauzonen_CH_BEZ_D')}</td>
      % if lang == 'de':
           <td>${c['attributes']['ch_bez_d'] or '-'}</td>
      % elif lang == 'fr':
           <td>${c['attributes']['ch_bez_f'] or '-'}</td>
      % endif
    </tr>
	<tr><td width="150">${_('tt_bauzonen_gemeindetypen_BFS_NO')}</td>    <td>${c['attributes']['bfs_no'] or '-'}</td></tr>
    <tr><td width="150">${_('tt_bauzonen_gemeindetypen_NAME')}</td>    <td>${c['value']}</td></tr>
    <tr><td width="150">${_('tt_bauzonen_gemeindetypen_KT_NO')}</td>    <td>${c['attributes']['kt_no'] or '-'}</td></tr>
	<tr><td width="150">${_('tt_bauzonen_gemeindetypen_KT_KZ')}</td>    <td>${c['attributes']['kt_kz'] or '-'}</td></tr>
    <tr><td width="150">${_('tt_bauzonen_FLAECHE')}</td>    <td>${int(round(c['attributes']['flaeche'])) or '-'}</td></tr>
</%def>
