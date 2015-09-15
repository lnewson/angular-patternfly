describe('Directive: pfUtilizationBarChart', function() {
  var $scope, $compile, element, utilizationBar, title, subTitle;

  beforeEach(module(
    'patternfly.charts',
    'charts/utilization-bar/utilization-bar-chart.html'
  ));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  beforeEach(function() {

    $scope.data = {
      'used': '8',
      'total': '16'
    };

    $scope.title = 'CPU Usage';
    $scope.units = 'GB';

    element = compileChart('<div pf-utilization-bar-chart chart-data=data chart-title=title units=units></div>', $scope);

  });

  var compileChart = function (markup, scope) {
    var el = $compile(markup)(scope);
    scope.$digest();
    return el;
  };

  it("should set the width of the inner bar to be 50%", function() {
    utilizationBar = angular.element(element).find('.progress-bar').css('width');
    expect(utilizationBar).toBe("50%");
  });

  it("should set the charts title and usage label", function() {
    title = angular.element(element).find('.progress-description').html();
    expect(title).toBe("CPU Usage");

    subTitle = angular.element(element).find('.progress-bar span').html();
    expect(subTitle).toBe("8 of 16 GB Used");

    //test 'percent' used-label-format
    element = compileChart("<div pf-utilization-bar-chart chart-data=data used-label-format='percent' chart-title=title units=units></div>", $scope);
    subTitle = angular.element(element).find('.progress-bar span').html();
    expect(subTitle).toBe("50% Used");
  });

  it("should set the layout to be 'inline'", function() {
    $scope.layoutInline = {
      'type': 'inline',
      'titleLabelWidth': '120px',
      'usedLabelWidth': '60px'
    };

    element = compileChart("<div pf-utilization-bar-chart chart-data=data layout=layoutInline chart-title=title units=units></div>", $scope);
    utilizationBar = angular.element(element).find('.progress-container');
    expect(utilizationBar.size()).toBe(1);

    utilizationBar = angular.element(element).find('.progress-container').css('padding-left');
    expect(utilizationBar).toBe("120px");
    utilizationBar = angular.element(element).find('.progress-container').css('padding-right');
    expect(utilizationBar).toBe("60px");
  });

  it("should set the error and warning thresholds", function() {
    element = compileChart("<div pf-utilization-bar-chart chart-data=data threshold-error='85' threshold-warning='45' chart-title=title units=units></div>", $scope);

    utilizationBar = angular.element(element).find('.progress-bar-warning');
    expect(utilizationBar.size()).toBe(1);

    element = compileChart("<div pf-utilization-bar-chart chart-data=data threshold-error='45' threshold-warning='15' chart-title=title units=units></div>", $scope);

    utilizationBar = angular.element(element).find('.progress-bar-danger');
    expect(utilizationBar.size()).toBe(1);
  });

});
