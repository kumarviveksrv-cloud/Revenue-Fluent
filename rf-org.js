/* rf-org.js — Revenue Fluent shared org data layer
   Reads rf_org_data from localStorage and provides helpers
   for all five tools to pre-populate and cross-feed data.
   Version 1.0 — Pass 4 */

var RFOrg = (function(){
  var ORG_KEY = 'rf_org_data';
  var L1_KEY  = 'rf_l1_outputs';
  var L4_KEY  = 'rf_l4_outputs';

  var CURRENCIES = {INR:'₹',USD:'$',GBP:'£',EUR:'€',SGD:'S$',JPY:'¥',AED:'AED '};

  function getOrg(){
    try{ var r=localStorage.getItem(ORG_KEY); return r?JSON.parse(r):null; }catch(e){return null;}
  }

  function getL1(){
    try{ var r=localStorage.getItem(L1_KEY); return r?JSON.parse(r):null; }catch(e){return null;}
  }

  function getL4(){
    try{ var r=localStorage.getItem(L4_KEY); return r?JSON.parse(r):null; }catch(e){return null;}
  }

  function saveL1(data){
    try{ localStorage.setItem(L1_KEY, JSON.stringify(data)); }catch(e){}
  }

  function saveL4(data){
    try{ localStorage.setItem(L4_KEY, JSON.stringify(data)); }catch(e){}
  }

  function sym(org){
    if(!org) return '₹';
    return CURRENCIES[org.orgCurrency] || org.currencySymbol || '₹';
  }

  // Inject a "My Org" context strip above tool content if org data is set
  function injectOrgStrip(containerId){
    var org = getOrg();
    if(!org || !org.orgName) return;
    var container = document.getElementById(containerId);
    if(!container) return;
    var s = sym(org);
    var compFmt = org.orgCompBase >= 10000000
      ? s+(org.orgCompBase/10000000).toFixed(1)+'Cr'
      : org.orgCompBase >= 100000
        ? s+(org.orgCompBase/100000).toFixed(1)+'L'
        : s+Number(org.orgCompBase).toLocaleString('en-IN');
    var strip = document.createElement('div');
    strip.id = 'orgStrip';
    strip.style.cssText = 'background:rgba(192,64,154,.07);border:1px solid rgba(192,64,154,.2);border-radius:8px;padding:9px 16px;margin-bottom:18px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;';
    strip.innerHTML = '<span style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;color:#C0409A">My Org</span>'
      +'<span style="font-size:.8rem;color:#E8E6E0;font-weight:600">'+org.orgName+'</span>'
      +(org.orgHeadcount?'<span style="font-size:.75rem;color:#B8C8E8">'+org.orgHeadcount+' people</span>':'')
      +(org.orgCompBase?'<span style="font-size:.75rem;color:#B8C8E8">'+compFmt+' comp base</span>':'')
      +(org.orgYear?'<span style="font-size:.75rem;color:#9AB8D8">'+org.orgYear+'</span>':'')
      +'<a href="myorg.html" style="margin-left:auto;font-family:var(--mono,\'DM Mono\',monospace);font-size:.55rem;color:#C0409A;text-decoration:none;opacity:.7">Edit &#8599;</a>';
    container.insertBefore(strip, container.firstChild);
  }

  // Get pre-population values for a given tool
  // Returns object with field values the tool should use
  function getToolDefaults(toolId){
    var org = getOrg();
    var l1  = getL1();
    var l4  = getL4();
    var defaults = {};

    if(!org) return defaults;

    // Fields common to all tools
    defaults.orgName    = org.orgName    || '';
    defaults.orgYear    = org.orgYear    || '';
    defaults.currency   = org.orgCurrency|| 'INR';
    defaults.sym        = sym(org);
    defaults.headcount  = org.orgHeadcount || 0;
    defaults.compBase   = org.orgCompBase  || 0;
    defaults.avgSalary  = org.orgAvgSalary || (org.orgHeadcount>0?Math.round(org.orgCompBase/org.orgHeadcount):0);
    defaults.hrCost     = org.orgHRCostCalc  || Math.round((org.orgCompBase||0)*0.04);
    defaults.ldBudget   = org.orgLDBudgetCalc|| Math.round((org.orgCompBase||0)*0.01);
    defaults.recSpend   = org.orgRecSpendCalc|| Math.round((org.orgCompBase||0)*0.025);

    // L4-specific: pull L1 outputs if available
    if(toolId === 'l4' && l1){
      defaults.l1TotalReturn    = l1.totalReturn    || 0;
      defaults.l1TotalInvestment= l1.totalInvestment|| 0;
      defaults.l1Ratio          = l1.ratio          || 0;
      defaults.l1RetSavings     = l1.retSavings     || 0;
      defaults.l1PerfUplift     = l1.perfUplift     || 0;
      defaults.l1CultPrem       = l1.cultPrem       || 0;
      defaults.l1TalentAcqVal   = l1.talentAcqVal   || 0;
    }

    // L5-specific: pull L4 outputs if available
    if(toolId === 'l5' && l4){
      defaults.l4NetProfit      = l4.netProfit      || 0;
      defaults.l4GrossMargin    = l4.grossMargin    || 0;
      defaults.l4TotalRev       = l4.totalRev       || 0;
      defaults.l4Ratio          = l4.ratio          || 0;
    }

    return defaults;
  }

  // Render a "data source" badge showing where values came from
  function sourceBadge(source){
    var labels = {org:'My Org', l1:'L1 Value Ledger', l4:'L4 Human P&L', scenario:'Scenario Data'};
    var colors = {org:'#C0409A', l1:'#3A7ADB', l4:'#F0EAE4', scenario:'#C4714A'};
    var label = labels[source] || source;
    var color = colors[source] || '#9AB8D8';
    return '<span style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.52rem;color:'+color+';border:1px solid '+color+'44;border-radius:4px;padding:1px 6px;margin-left:6px">'+label+'</span>';
  }

  // L1 saves its key outputs so L4 can read them
  // Call this from p1-tool.html after render completes
  function publishL1(data){
    saveL1({
      totalReturn:     data.totalReturn     || 0,
      totalInvestment: data.totalInvestment || 0,
      ratio:           data.ratio           || 0,
      retSavings:      data.retSavings      || 0,
      perfUplift:      data.perfUplift      || 0,
      cultPrem:        data.cultPrem        || 0,
      talentAcqVal:    data.talentAcqVal    || 0,
      scenario:        data.scenario        || '',
      publishedAt:     new Date().toISOString()
    });
  }

  // L4 saves its key outputs so L5 can read them
  // Call this from p4-tool.html after render completes
  function publishL4(data){
    saveL4({
      netProfit:    data.netProfit    || 0,
      grossMargin:  data.grossMargin  || 0,
      totalRev:     data.totalRev     || 0,
      totalCOGS:    data.totalCOGS    || 0,
      ratio:        data.ratio        || 0,
      scenario:     data.scenario     || '',
      publishedAt:  new Date().toISOString()
    });
  }

  // Check if My Org data is sufficiently populated to be useful
  function isOrgReady(){
    var org = getOrg();
    return !!(org && org.orgName && org.orgCompBase > 0 && org.orgHeadcount > 0);
  }

  // Format number using org currency
  function fmtOrg(n){
    var org = getOrg();
    var s = sym(org);
    if(!n||isNaN(n)) return s+'0';
    if(n>=10000000) return s+(n/10000000).toFixed(2)+'Cr';
    if(n>=100000)   return s+(n/100000).toFixed(2)+'L';
    return s+Math.round(n).toLocaleString('en-IN');
  }

  return {
    get:            getOrg,
    getL1:          getL1,
    getL4:          getL4,
    publishL1:      publishL1,
    publishL4:      publishL4,
    getToolDefaults:getToolDefaults,
    injectOrgStrip: injectOrgStrip,
    isReady:        isOrgReady,
    sym:            sym,
    fmt:            fmtOrg,
    sourceBadge:    sourceBadge
  };
})();
